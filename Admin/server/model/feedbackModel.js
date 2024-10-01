import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema(
  {
    feedbackname: {
      type: String,
      required: true,
    },
    feedbackconsern: {
      type: String,
      required: true,
    },
    feedbackemail: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    feedbacknumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Ensure it's a 10-digit number
    },
   
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
