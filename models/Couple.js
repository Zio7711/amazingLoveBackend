import mongoose from 'mongoose';

const CoupleSchema = new mongoose.Schema({
  girlfriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },

  boyfriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },

  bucketList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BucketListItem',
    },
  ],
});

export default mongoose.model('Couple', CoupleSchema);
