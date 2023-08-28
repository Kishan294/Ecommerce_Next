import { NavLinks } from "@/constants";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className=" flex flex-col gap-2 ml-6 h-[90vh] pt-2 border-r-2 ">
      {NavLinks.map((link) => (
        <Link
          key={link.name}
          className={`flex gap-2 items-center rounded-l-md hover:bg-gray-800 pl-4 pr-8 py-2 w-full hover:text-white ${
            pathname === link.href || pathname.includes(link.href)
              ? "bg-gray-800 text-white"
              : "text-gray-400"
          }`}
          href={link.href}
        >
          <link.icon width={18} height={18} />
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
