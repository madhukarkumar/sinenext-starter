import { Header } from "@/components/header";

export default function InnterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col p-4">{children}</main>
    </>
  );
}
