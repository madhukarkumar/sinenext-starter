import { Metadata } from "next";

import { ChatContainer } from "@/components/chat-container";

export const metadata: Metadata = { title: "Chat" };

export default async function UsersPage() {
  return <ChatContainer />;
}
