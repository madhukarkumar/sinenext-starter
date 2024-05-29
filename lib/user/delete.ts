import { eleganceServerClient } from "@/lib/elegance/server-client";
import { UserRow } from "@/types/user";

export function deleteUser(id: UserRow["ID"]) {
  return eleganceServerClient.controllers.deleteMany({ collection: "users", where: `ID = ${id}` });
}
