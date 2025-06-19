import mongoose, { ConnectOptions } from "mongoose";

interface connectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL as string, options)
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => {
      console.error("Error connecting to the database:", err.message);
      process.exit(1); // Exit the process with failure
    });
  // Set mongoose to use strict query mode
  mongoose.set("strictQuery", false);
};

export default connectDB;
