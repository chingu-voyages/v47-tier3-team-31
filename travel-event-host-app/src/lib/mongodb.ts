import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error('Invalid enviroment variable: MONGODB_URI');
}

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);

    if (connection.readyState === 1) {
      return;
    }
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
    throw new Error('Error connecting to MongoDB: ' + error);
  }
};
