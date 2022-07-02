import { scryptSync, randomBytes } from "crypto";

import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

import type { Role } from "./role";
import type { SecureUser } from "./user";

const db = new JsonDB(
  new Config("database", true, true, "/"),
  true,
  true,
);

db.load();
if (!db.exists("/users")) {
  const roles: Role[] = [
    { id: 1, displayName: "admin" },
    { id: 2, displayName: "viewer" },
  ];

  db.push("/roles", roles, true);

  const initialAdminPassword = "admin";
  const salt = randomBytes(32);
  const passwordHash = scryptSync(Buffer.from(initialAdminPassword, "utf8"), salt, 64, {
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
  });

  const users: SecureUser[] = [
    {
      id: 1,
      displayName: "Administrator",
      email: "admin@bits.de",
      passwordHash: passwordHash.toString("hex"),
      salt: salt.toString("hex"),
      roles: [1],
    },
  ];

  db.push("/users", users, true);

  db.save();
}



export default db;
