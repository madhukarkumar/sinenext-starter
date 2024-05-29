"use client";

import { ColumnDef, Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComponentProps } from "@/types/ui";
import { User } from "@/types/user";

export type UsersTableProps = ComponentProps<"div", { data: User[]; count: number }>;

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "Profile",
    cell: ({ row }) => {
      const image: string = row.getValue("avatar");
      const email: string = row.getValue("Email");
      return image ? (
        <Image
          className="rounded-full border"
          width={64}
          height={64}
          src={image}
          alt={email}
        />
      ) : null;
    },
  },
  { accessorKey: "FirstName", header: "First Name" },
  { accessorKey: "LastName", header: "Last Name" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Company", header: "Company" },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionsCell row={row} />;
    },
  },
];

export function UsersTable({ className, data = [], count, ...props }: UsersTableProps) {
  const [users, setUsers] = useState<UsersTableProps["data"]>(data);
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users?skip=${users.length}&limit=${10}`);
      const data = await response.json();
      setUsers((i) => [...i, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      {...props}
      className={cn("flex flex-col gap-4", className)}
    >
      <Card className="max-h-[64rem] flex-1 overflow-hidden">
        <Table wrapperProps={{ className: "h-full" }}>
          <TableHeader className="sticky top-0 bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder
                        ? flexRender(header.column.columnDef.header, header.getContext())
                        : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {users.length < count && (
        <Button
          className="self-center"
          variant="secondary"
          disabled={isLoading}
          onClick={handleClick}
        >
          Load more
        </Button>
      )}
    </div>
  );
}

function ActionsCell({ row }: { row: Row<User> }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick = async () => {
    try {
      setIsLoading(true);
      await fetch(`/api/users?id=${row.original.ID}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          // disabled // For your local env uncomment below and comment this one
          disabled={isLoading}
          onClick={handleDeleteClick}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
