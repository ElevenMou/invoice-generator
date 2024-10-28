import Image from "next/image";
import React from "react";
import UserInfo from "./UserInfo";
import MenuIcon from "./MenuIcon";
import { getAuthSession } from "@/lib/auth/authOptions";
import Link from "next/link";

const Header = async () => {
  const session = await getAuthSession();
  return (
    <header className="bg-card h-20 flex justify-between md:px-20 px-4 sticky inset-0 z-50">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/images/Logo.svg" alt="logo" width={40} height={40} />
        <div className="font-bold text-2xl">
          <span className="text-primary_5">Mo</span>
          <span className="text-primary_2">voice</span>
        </div>
      </Link>
      <div className="flex items-center md:hidden">
        <MenuIcon />
      </div>
      <div className="hidden items-center md:flex">
        {session ? <UserInfo /> : null}
      </div>
    </header>
  );
};

export default Header;
