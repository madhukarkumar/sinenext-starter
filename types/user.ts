export type UserRow = {
  ID: number;
  FirstName?: string;
  LastName?: string;
  Username?: string;
  Email?: string;
  Company?: string;
};

export type User = Omit<UserRow, "ID"> & { avatar?: string };
