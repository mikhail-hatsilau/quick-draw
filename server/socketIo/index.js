import Participant from '../models/participant';

function saveJoinedUser(data, callback) {
  Participant.findOne({ user: data.user.id }, (err, user) => {
    if (err) {
      throw new Error(err);
    }
    console.log(user);
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
      let time = 0;
      console.log(interval);
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        time++;
        io.to('participants').emit('timer inc', time);
        io.to('admins').emit('timer inc', time);
        if (time >= data.task.timeLimit) {
          clearInterval(interval);
        }
      }, 1000);
    });
    socket.on('stop quiz', () => {
      if (interval) {
        clearInterval(interval);
      }
      io.to('participants').emit('stop');
    });
    socket.on('pass test', (data, callback) => {
      console.log(data);
      callback();
    });
    socket.on('admin left', () => {
      socket.leave('admins');
    });
    socket.on('participant left', () => {
      socket.leave('participants');
    });
  });
}
