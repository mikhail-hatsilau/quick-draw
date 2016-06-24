import Participant from '../models/participant';

function saveJoinedUser(data, callback) {
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

export default function (io) {
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
  });
}
