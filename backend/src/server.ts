import config from "config";
import app from "./app";
import { logger } from "./utils";

const port = config.get("environment.port") as number;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
