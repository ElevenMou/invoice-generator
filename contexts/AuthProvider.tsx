"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

declare type ProviderProps = { children: React.ReactNode; session?: Session };
const AuthProvider = ({ children, session }: ProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
