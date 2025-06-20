import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="h-[4rem] bg-gray-800 text-white px-[120px] flex items-center justify-between space-x-10">
        <h1 className="text-xl">Admin Dashboard</h1>
        <Link href="/" className="text-xl">
          HOME
        </Link>
      </header>
      <main className="bg-gray-100 text-black h-screen">{children}</main>
    </div>
  );
}
