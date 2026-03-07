import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.LIVE_DB!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" Failed to connect to MongoDB", error);
    process.exit(1); 
};
}
export default connectDB;
