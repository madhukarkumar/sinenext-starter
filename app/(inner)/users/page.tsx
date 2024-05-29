import { Metadata } from "next";

import { countUsers } from "@/lib/user/count";
import { getUsers } from "@/lib/user/get-many";
import { UserCreate } from "@/components/user/create";
import { UsersTable } from "@/components/user/table";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { offset?: string; limit?: string };
}) {
  const [users, usersCount] = await Promise.all([
    getUsers({
      offset: +(searchParams.offset || 0),
      limit: +(searchParams.limit || 10),
    }),
    countUsers(),
  ]);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="flex items-start gap-2 text-3xl">
          Users
          <span className="text-lg">({usersCount})</span>
        </h1>
        <UserCreate />
      </header>

      <UsersTable
        className="mt-6 flex-1"
        data={users}
        count={usersCount}
      />
    </>
  );
}
