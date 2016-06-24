import Participant from '../models/participant';

export function getParticipants(req, resp, next) {
  Participant.find({}).populate('user', 'username _id').exec((err, participants) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({
      success: true,
      participants,
    });
  });
}
