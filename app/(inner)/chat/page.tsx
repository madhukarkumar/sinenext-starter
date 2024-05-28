import { Metadata } from "next";

export const metadata: Metadata = { title: "Chat" };

export default async function UsersPage() {
  return <h1 className="text-3xl">Chat</h1>;
}
