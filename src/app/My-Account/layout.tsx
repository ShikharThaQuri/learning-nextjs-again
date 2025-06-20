import Navbar from "@/components/Navbar";

export default function MyAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="h-screen bg-gray-100 text-black py-[2rem]">
        {children}
      </main>
    </>
  );
}
