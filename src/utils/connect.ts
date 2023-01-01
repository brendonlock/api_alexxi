import mongoose from "mongoose";
import logger from "./index";

async function connect() {
  const dbUri = "mongodb+srv://brendon:Kearsney12@cluster0.c6awj.mongodb.net/Alexxi-API?retryWrites=true&w=majority"

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;