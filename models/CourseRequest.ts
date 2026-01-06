import mongoose from 'mongoose';

const CourseRequestSchema = new mongoose.Schema({
  lecturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lecturerName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
}, { timestamps: true });

// Force recompilation of the model if it already exists (to handle schema changes in dev)
if (mongoose.models.CourseRequest) {
  delete mongoose.models.CourseRequest;
}

export default mongoose.model('CourseRequest', CourseRequestSchema);
