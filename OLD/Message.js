import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: [true, 'Sender is required'],
      trim: true,
    },

    receiver: {
      type: String,
      required: [true, 'Receiver is required'],
      trim: true,
    },

    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },

    couple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Couple',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
