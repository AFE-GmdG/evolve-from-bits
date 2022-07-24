import { scryptSync, randomBytes } from "crypto";

import db from "."
import { Lazy } from "./lazy";
import { roles } from "./role";

export type SecureUser = {
  id: number;
  displayName: string;
  email: string;
  passwordHash: string;
  salt: string;
  roles: number[];
};

export type User = {
  id: number;
  displayName: string;
  roles: string[];
};

export const users: Lazy<SecureUser[]> = new Lazy(() => db.getObject<SecureUser[]>("/users"));

export const createUser = (displayName: string, email: string, password: string): User => {
  if (users.refresh().find(user => user.displayName === displayName)) {
    throw new Error("Username already taken.");
  }
  if (users.value.find(user => user.email === email)) {
    throw new Error("User already exists.");
  }

  const salt = randomBytes(32);
  const passwordHash = scryptSync(Buffer.from(password, "utf8"), salt, 64, {
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
  });

  const id = users.value.reduce((acc, user) => Math.max(acc, user.id), 0) + 1;
  const viewer = roles.refresh().find((r) => r.displayName === "viewer");
  if (!viewer) {
    throw new Error("viewer role not found");
  }

  const newUser: SecureUser = {
    id,
    displayName,
    email,
    passwordHash: passwordHash.toString("hex"),
    salt: salt.toString("hex"),
    roles: [viewer.id],
  };

  db.push("/users", [newUser], false);

  return {
    id,
    displayName,
    roles: [viewer.displayName],
  };
};
