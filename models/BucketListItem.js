import mongoose from 'mongoose';

// const { title, description, isCompleted, image, location, date } = item;
const BucketListItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  image: {
    type: String,
  },

  location: {
    type: String,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  couple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Couple',
  },
});

export default mongoose.model('BucketListItem', BucketListItemSchema);
