import App from "./app";
import UserController from "./controllers/user";

const app = new App([
  new UserController(),
], 3000);

app.listen();
