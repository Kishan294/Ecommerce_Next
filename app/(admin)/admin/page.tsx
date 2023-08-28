"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="font-semibold mt-0">
        Hello,
        <span className="text-blue-400 text-lg"> {session?.user?.name}</span>
      </h1>
    </div>
  );
}
