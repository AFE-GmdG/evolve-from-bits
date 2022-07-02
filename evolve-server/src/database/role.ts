import db from "."
import { Lazy } from "./lazy";

export type Role = {
  id: number;
  displayName: string;
};

export const roles: Lazy<Role[]> = new Lazy(() => db.getObject<Role[]>("/roles"));
