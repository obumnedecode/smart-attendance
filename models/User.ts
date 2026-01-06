import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['STUDENT', 'LECTURER', 'ADMIN'],
    default: 'STUDENT',
  },
  avatar: {
    type: String,
    default: 'https://picsum.photos/100/100',
  },
  studentId: {
    type: String,
    // Only required if role is student, but keeping it optional for flexibility
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
