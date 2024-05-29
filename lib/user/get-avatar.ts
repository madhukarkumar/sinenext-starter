import { User } from "@/types/user";

export async function getUserAvatar(): Promise<User["avatar"]> {
  const randomNumber = Math.floor(Math.random() * 500) + 1;
  return `https://i.pravatar.cc/${randomNumber}`;
}
