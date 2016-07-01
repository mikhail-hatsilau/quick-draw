import Participant from '../models/participant';

function saveJoinedUser(data, callback) {
  Participant.findOne({ user: data.user.id }, (err, user) => {
    if (err) {
      throw new Error(err);
    }
    if (!user) {
      const participant = new Participant({
        user: data.user.id,
        tasksResults: [],
      });
      participant.save((err, savedParticipant) => {
        if (err) {
          throw new Error(err);
        }
        const options = {
          path: 'user',
          select: '_id username',
        };
        Participant.populate(savedParticipant, options, (err, savedParticipant) => {
          if (err) {
            throw new Error(err);
          }
          callback(savedParticipant);
        });
      });
    }
  });
}

function updateParticipant(data, callback) {
  const userId = data.user.id;
  const taskId = data.task['_id'];
  const taskResult = {
    task: taskId,
    time: data.timeSpent,
    selector: data.selector,
  };
  Participant.findOne({ user: userId }, (err, participant) => {
    if (err) {
      throw new Error(err);
    }
    if (participant.tasksResults.findIndex(result => result.task.toString() === taskResult.task) !== -1) {
      Participant.update({ user: userId, 'tasksResults.task': taskId }, { $set: { 'tasksResults.$': taskResult } }, (err) => {
        if (err) {
          throw new Error(err);
        }
        callback();
      });
      return;
    }
    Participant.update({ user: userId }, { $push: { tasksResults: taskResult } }, (err) => {
      if (err) {
        throw new Error(err);
      }
      callback();
    });
  });
}

function removeParticipant(participant, callback) {
  Participant.remove({ user: participant.id }, err => {
    if (err) {
      throw new Error(err);
    }
    callback();
  });
}

function clearParticipantsResults(callback) {
  Participant.update({}, { $set: { tasksResults: [] } }, { multi: true }, (err) => {
    if (err) {
      throw new Error(err);
    }
    callback();
  });
}

export default function (io) {
  let interval;
  io.on('connection', socket => {
    socket.on('join participant', data => {
      socket.join('participants');
      saveJoinedUser(data, participant => {
        io.to('admins').emit('participant joined', participant);
      });
    });
    socket.on('join admin', () => {
      socket.join('admins');
    });
    socket.on('start quiz', data => {
      io.to('participants').emit('start test', data.task);
      io.to('admins').emit('start test', data.task);
      let time = 0;
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        time++;
        io.to('participants').emit('timer inc', time);
        io.to('admins').emit('timer inc', time);
        if (time >= data.task.timeLimit) {
          clearInterval(interval);
          io.to('participants').emit('stop');
          io.to('admins').emit('stop');
        }
      }, 1000);
    });
    socket.on('stop quiz', () => {
      if (interval) {
        clearInterval(interval);
      }
      io.to('participants').emit('stop');
      io.to('admins').emit('stop');
    });
    socket.on('pass test', (data, callback) => {
      if (!data.success) {
        data.timeSpent = data.task.timeLimit;
      }
      updateParticipant(data, () => {
        io.to('admins').emit('participant passed test', {
          userId: data.user.id,
          result: {
            task: data.task['_id'],
            time: data.timeSpent,
            selector: data.selector,
          },
        });
      });
      callback();
    });
    socket.on('admin left', () => {
      socket.leave('admins');
    });
    socket.on('participant left', participant => {
      socket.leave('participants');
      removeParticipant(participant, () => {
        io.to('admins').emit('quiz participant left', participant);
      });
    });
    socket.on('clear results', () => {
      clearParticipantsResults(() => {
        io.to('admins').emit('results were cleared');
      });
    });
  });
}
