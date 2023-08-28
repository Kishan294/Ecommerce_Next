import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Topbar = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  return (
    <div className="border-b-2 flex justify-between items-center border-gray-900 px-10 h-[10vh]">
      <Link href={"/"} className="font-bold text-lg">
        Ecommerce <span className="text-blue-400">Store</span>
      </Link>
      <Popover>
        <PopoverTrigger>
          {" "}
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm font-semibold">{session?.user?.name}</p>
            {userImage ? (
              <Avatar>
                <AvatarImage
                  src={userImage}
                  width={18}
                  height={18}
                  alt="image"
                />
              </Avatar>
            ) : (
              <div className="border rounded-full p-1 cursor-pointer ">
                <UserIcon className=" w-4 h-4" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col justify-center items-start gap-2 w-44">
          <Link href={"/userdetails"} className="border-b-2 pb-2">
            Account Settings
          </Link>
          <Button
            variant={"destructive"}
            onClick={() => signOut()}
            className="w-full"
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Topbar;
