import express from "express";
import db from "../database";

import { Role, roles } from "../database/role";
import { createUser, SecureUser, User, users } from "../database/user";

class UserController {
  private static readonly path = "/user"
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get(UserController.path, this.getAll);
    this.router.get(`${UserController.path}/:id`, this.getById);
    this.router.post(UserController.path, this.create);
    this.router.put(`${UserController.path}/:id`, this.update);
    this.router.delete(`${UserController.path}/:id`, this.delete);
  }

  private getAll = (_request: express.Request, response: express.Response) => {
    const allRoles = roles.refresh();
    const allUsers: User[] = users.refresh().map((secureUser) => ({
      id: secureUser.id,
      displayName: secureUser.displayName,
      roles: secureUser.roles.reduce<string[]>((acc, roleId) => {
        const role = allRoles.find((r) => r.id === roleId);
        if (role) {
          acc.push(role.displayName);
        }
        return acc;
      }, []),
    }));
    response.json(allUsers);
  }

  private getById = (request: express.Request, response: express.Response) => {
    const id = Number.parseInt(request.params.id, 10);
    if (Number.isNaN(id)) {
      response.status(400).json({message: "Invalid id"});
      return;
    }

    const secureUser = users.refresh().find((user) => user.id === id);
    if (!secureUser) {
      response.status(404).json({message: "User not found"});
      return;
    }

    const allRoles = roles.refresh();
    const user: User = {
      id: secureUser.id,
      displayName: secureUser.displayName,
      roles: secureUser.roles.reduce<string[]>((acc, roleId) => {
        const role = allRoles.find((r) => r.id === roleId);
        if (role) {
          acc.push(role.displayName);
        }
        return acc;
      }
      , []),
    };

    response.json(user);
  }

  private create = (request: express.Request, response: express.Response) => {
    const { displayName, email, password } = request.body;
    if (!displayName || !email || !password) {
      response.status(400).json({message: "Invalid request"});
      return;
    }
    try {
      const newUser = createUser(displayName, email, password);
      response.json(newUser);
    } catch (error) {
      const message = error instanceof Error
        ? error.message || "Unknown error"
        : "Unknown error";
      response.status(400).json({message});
    }
  }

  private update = (_request: express.Request, response: express.Response) => {
    response.send("update user");
  }

  private delete = (_request: express.Request, response: express.Response) => {
    response.send("delete user");
  }
}

export default UserController;
