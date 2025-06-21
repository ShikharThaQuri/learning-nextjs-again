import AdminSideNavbar from "./AdminSideNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-64">
      <AdminSideNavbar />
      <main className="bg-gray-100 text-black h-screen">{children}</main>
    </div>
  );
}
