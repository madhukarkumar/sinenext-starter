import { eleganceServerClient } from "@/lib/elegance/server-client";
import { User } from "@/types/user";

export function updateUser(id: User["ID"], value: Partial<Omit<User, "ID">>) {
  const setValues = Object.entries(value).map(([key, value]) => {
    return typeof value === "string" ? `${key} = '${value}'` : `${key} = ${value}`;
  });

  return eleganceServerClient.controllers.updateMany({
    collection: "users",
    set: setValues.join(", "),
    where: `ID = ${id}`,
  });
}
