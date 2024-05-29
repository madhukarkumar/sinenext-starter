import { eleganceServerClient } from "@/lib/elegance/server-client";
import { User } from "@/types/user";

export function createUser(value: User) {
  return eleganceServerClient.controllers.insertOne({ collection: "users", value });
}
