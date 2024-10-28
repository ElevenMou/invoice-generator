"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import LoginProviders from "@/lib/auth/LoginProviders";

const UserInfo = () => {
  const { data: session } = useSession();
  const [showProvidersDropdown, setShowProvidersDropdown] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      {session ? (
        <>
          <div className="gap-2 flex">
            <div className="h-10 w-10 bg-primary_5 rounded-full overflow-hidden">
              <Image
                src={session.user?.image || "/default-profile.jpeg"}
                alt="user"
                width={40}
                height={40}
                className="object-cover w-10 h-auto"
              />
            </div>
            <div className="hidden flex-col xs:flex">
              <span className="text-lg leading-5 capitalize font-bold text-text">
                {session.user?.name}
              </span>
              <span className="leading-4 text-textLight whitespace-break-spaces">
                {session.user?.email}
              </span>
            </div>
            <button onClick={() => signOut()}>
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-text" />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserInfo;
