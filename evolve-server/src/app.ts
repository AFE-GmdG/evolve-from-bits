import express from "express";
import bodyParser from "body-parser";
import proxy from "express-http-proxy";

import { Controllers } from "./controllers";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controllers, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeStaticFiles();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private initializeStaticFiles() {
    this.app.use("/", proxy("http://localhost:5000"));
    // this.app.use(express.static("public"));
  }

  private initializeErrorHandling() {
    this.app.use((_request: express.Request, response: express.Response) => {
      response.status(404).send("Not found");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
