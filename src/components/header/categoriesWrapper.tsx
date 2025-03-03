"use client";
import { usePathname } from "next/navigation";
//import Categories from "./Categories";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-md:hidden">
      {pathname === "/"?<div>{children}</div> : ""}
    </div>
  );
}
