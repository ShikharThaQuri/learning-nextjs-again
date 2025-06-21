import AdminSideNavbar from "./AdminSideNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminSideNavbar />
      <main className="bg-gray-100 text-black h-screen pl-64">{children}</main>
    </div>
  );
}
