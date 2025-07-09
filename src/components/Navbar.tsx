import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <ul className="flex space-x-10">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Products" className="text-gray-300 hover:text-white">
              Products
            </Link>
          </li>
          <li>
            <Link href="/My-Account" className="text-gray-300 hover:text-white">
              My Account
            </Link>
          </li>
          <li>
            <Link href="/Admin-Page" className="text-gray-300 hover:text-white">
              Admin
            </Link>
          </li>
          <li>
            <Link href="/Login" className="text-gray-300 hover:text-white">
              Login/Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
// This is a simple Navbar component using Tailwind CSS for styling.
