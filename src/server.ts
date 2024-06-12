import app from "./app";
import { EnvConfig } from "./config";
import dbConnect from "./utils/dbConnect";

async function main() {
  try {
    await dbConnect();

    app.listen(EnvConfig.port, () =>
      console.log(`Server is listening on port ${EnvConfig.port}`),
    );
  } catch (error) {
    console.log(`An error occured: ${error}`);
  }
}

main();
