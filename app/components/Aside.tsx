import Link from "next/link";

export const Aside = () => {
  return (
    <aside className="bg-gray-800 text-gray-100 w-64 flex-shrink-0">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Kingsword Abuja App</h1>
      </div>
      <nav className="py-4">
        <ul>
          <li>
            <Link href="/admin/dashboard">
              <div className="block py-2 px-4 hover:bg-gray-700">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link href="/firstTimerUpload">
              <div className="block py-2 px-4 hover:bg-gray-700">Upload First Timers List</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/products">
              <div className="block py-2 px-4 hover:bg-gray-700">Products</div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
