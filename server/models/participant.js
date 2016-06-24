import mongoose from 'mongoose';

const taskResultSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
  },
  time: String,
  selector: String,
});

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  tasksResults: [taskResultSchema],
});

export default mongoose.model('Participant', participantSchema);
