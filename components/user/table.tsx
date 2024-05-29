"use client";

import { ColumnDef, Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IS_PUBLIC } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserForm } from "@/components/user/form";
import { ROUTES } from "@/constants/routes";
import { ComponentProps } from "@/types/ui";
import { User } from "@/types/user";

export type UsersTableProps = ComponentProps<"div", { data: User[]; count: number }>;

export function UsersTable({ className, data = [], count, ...props }: UsersTableProps) {
  const router = useRouter();

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClick = () => {
    router.replace(`${ROUTES.USERS}?limit=${data.length + 10}`);
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

      {data.length < count && (
        <Button
          className="self-center"
          variant="secondary"
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

  const handleFetch = async (fetch: Promise<Response>) => {
    try {
      setIsLoading(true);
      const response = await fetch;
      router.refresh();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <UserForm
        trigger={
          <Button
            variant="ghost"
            className="gap-1 text-sm"
            disabled={isLoading}
          >
            <Edit className="size-4" />
            Edit
          </Button>
        }
        defaultValues={row.original}
        onSubmit={(values) => {
          return handleFetch(
            fetch(`/api/users?id=${row.original.ID}`, { method: "PUT", body: JSON.stringify(values) }),
          );
        }}
      />

      <Button
        variant="ghost"
        className="gap-1 text-sm"
        disabled={IS_PUBLIC || isLoading}
        onClick={() => {
          if (IS_PUBLIC) return;
          return handleFetch(fetch(`/api/users?id=${row.original.ID}`, { method: "DELETE" }));
        }}
      >
        <Trash className="size-4" />
        Delete
      </Button>
    </div>
  );
}
