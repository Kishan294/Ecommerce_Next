"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [coordinate, setCoordinate] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setCoordinate({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (!session) {
    return (
      <div className="w-[90vw] flex  mx-auto justify-between items-end   px-44 py-14">
        <div className="w-[40%] my-20">
          <p className="text-gray-400 my-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores,
            quisquam!
          </p>
          <Button
            variant={"outline"}
            onClick={() => signIn("google")}
            className=" flex items-center gap-2"
          >
            <Image
              src={"/google.png"}
              width={18}
              height={18}
              alt="Google icon"
            />
            Login in with google{" "}
          </Button>
        </div>
        <div>
          <Image src={"/headphone.png"} width={500} height={20} alt="shoes" />
          <h1 className="text-[200px] text-white/5 absolute top-36 right-36 -z-10 mx-auto font-bold">
            HEADPHONE
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col  ">
      {/* {coordinate && (
        <div
          className="w-6 h-6 bg-white cursor rounded-full mix-blend-difference absolute"
          style={{
            left: coordinate.x - 5,
            top: coordinate.y - 6,
          }}
        />
      )} */}

      <Topbar />
      <div className="flex justify-between ">
        <Sidebar />
        <ScrollArea className="w-full h-[85vh] py-6 px-10">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Layout;
