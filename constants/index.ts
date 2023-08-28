import {
  Cog6ToothIcon,
  HomeIcon,
  ListBulletIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export const NavLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Products", href: "/admin/products", icon: ArchiveBoxIcon },
  { name: "Orders", href: "/admin/orders", icon: ListBulletIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];
