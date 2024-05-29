import { Metadata } from "next";

import { getBooks } from "@/lib/book/get-many";
import { ChatContainer } from "@/components/chat/container";

export const metadata: Metadata = { title: "Chat" };

export default async function UsersPage() {
  const books = await getBooks();
  return <ChatContainer books={books} />;
}
