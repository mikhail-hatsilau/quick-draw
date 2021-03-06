import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  deprecatedSelectors: String,
  answare: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Task', taskSchema);
