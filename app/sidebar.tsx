import Link from "next/link";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="sidebar w-64 h-full fixed top-0 left-0 bg-gray-100 p-5">
      <ul className="list-none flex flex-col justify-between">
        <li>
          <Link href="/">
            <Button className="p-6 mb-2 text-white no-underline dark:bg-blue-950  hover:bg-gray-300 w-full">
              Marketplace
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/instances">
            <Button className="p-6 mb-2 text-white no-underline dark:bg-blue-950 hover:bg-gray-300 w-full">
              Running Instances
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
