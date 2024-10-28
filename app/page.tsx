import { btnPrimaryStyle, btnStyle } from "@/components/UI/Button";
import { getAuthSession } from "@/lib/auth/authOptions";
import LoginProviders from "@/lib/auth/LoginProviders";
import { redirect } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function Home() {
  const session = await getAuthSession();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="h-main flex md:flex-row flex-col ">
      <section className="px-6 md:px-20 py-6 flex flex-col gap-4 justify-center bg-gradient-to-br from-primary_5 to-primary_3">
        <h1 className="text-5xl font-bold text-white">
          Invoice generator for your businesses
        </h1>
        <p className="text-white">
          Manage your Companies, Clients and Invoices in one place
        </p>
      </section>
      <section
        className="flex items-center justify-center flex-col gap-4 p-6 bg-background flex-1"
        style={{ minHeight: "calc(100vh - 8rem)" }}
      >
        <div className="mb-4">
          <p className="text-lg text-center">
            Please sign in to continue to MoVoice. It&apos;s free
          </p>
        </div>
        <LoginProviders />
      </section>
    </div>
  );
}
