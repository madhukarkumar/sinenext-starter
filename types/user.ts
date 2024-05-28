import { users } from "@prisma/client";

export type User = Omit<users, "ID"> & { avatar?: string };
