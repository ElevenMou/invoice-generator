"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const LoginProviders = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <>
      {providers ? (
        <>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              className={twMerge("px-4 py-2 rounded-lg")}
              style={{
                backgroundColor: "var(--color-neutral-0)",
                color: "var(--color-neutral-9)",
                width: "210px",
              }}
              onClick={() => signIn(provider.id)}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/images/${provider.id}.svg`}
                  alt={provider.name}
                  width={20}
                  height={20}
                  className="h-auto w-6"
                />
                <span className="whitespace-nowrap inline">
                  Sign in with {provider.name}
                </span>
              </div>
            </button>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default LoginProviders;
