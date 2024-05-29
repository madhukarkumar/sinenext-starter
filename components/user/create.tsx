"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "@/types/ui";

export type UserCreateProps = ComponentProps<DialogTriggerProps>;

const formSchema = z.object({
  FirstName: z.string().min(1).max(256),
  LastName: z.string().max(256).optional(),
  Username: z.string().max(256).optional(),
  Email: z.string().max(256).optional(),
  Company: z.string().max(256).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const filedNames = Object.keys(formSchema.shape) as (keyof FormSchema)[];

export function UserCreate({ ...props }: UserCreateProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formId = useId();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { FirstName: "", LastName: "", Username: "", Email: "", Company: "" },
  });

  const handleSubmit: SubmitHandler<FormSchema> = async (values) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await fetch("/api/users", { method: "POST", body: JSON.stringify(values) });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger
        {...props}
        asChild
      >
        <Button>
          <Plus className="size-5" />
          Add user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id={formId}
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {filedNames.map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </form>
          {error && (
            <p className="w-full max-w-full rounded-lg border border-destructive p-2 text-sm text-destructive">
              {error}
            </p>
          )}
        </Form>
        <DialogFooter>
          <Button
            form={formId}
            type="submit"
            disabled={isLoading}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
