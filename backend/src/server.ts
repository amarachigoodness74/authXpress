import config from "config";
import app from "./app";
import { logger, connectDB } from "./utils";

const port = config.get("environment.port") as number;

app.listen(port, () => {
  // Connect to MongoDB
  connectDB();
  logger.info(`Server is running on port ${port}`);
});
