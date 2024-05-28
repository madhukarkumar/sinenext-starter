import { Metadata } from "next";

import { countUsers } from "@/lib/user/count";
import { getUsers } from "@/lib/user/get-many";
import { UsersTable } from "@/components/users-table";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const [users, usersCount] = await Promise.all([getUsers({ limit: 10 }), countUsers()]);

  return (
    <>
      <h1 className="flex items-start gap-2 text-3xl">
        Users
        <span className="text-lg">({usersCount})</span>
      </h1>

      <UsersTable
        className="mt-6 flex-1"
        data={users}
        count={usersCount}
      />
    </>
  );
}
