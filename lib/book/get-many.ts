import { eleganceServerClient } from "@/lib/elegance/server-client";
import { Book } from "@/types/book";

export function getBooks() {
  return eleganceServerClient.controllers.query<Book[]>({
    query: `\
      SELECT * FROM books
      WHERE embeddingCollectionName IS NOT NULL AND embeddingCollectionName != ''
      ORDER BY title
    `,
  });
}
