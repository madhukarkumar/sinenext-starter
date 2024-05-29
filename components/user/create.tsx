"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserForm, UserFormProps } from "@/components/user/form";
import { ComponentProps } from "@/types/ui";

export type UserCreateProps = ComponentProps<Omit<UserFormProps, "trigger" | "onSubmit">>;

export function UserCreate({ ...props }: UserCreateProps) {
  const router = useRouter();

  const handleSubmit: UserFormProps["onSubmit"] = async (values) => {
    const response = await fetch("/api/users", { method: "POST", body: JSON.stringify(values) });
    router.refresh();
    return response;
  };

  return (
    <UserForm
      {...props}
      trigger={
        <Button>
          <Plus className="size-5" />
          Add user
        </Button>
      }
      onSubmit={handleSubmit}
    />
  );
}
