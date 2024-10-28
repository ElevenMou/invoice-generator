import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center h-main">
      <div className="bg-card p-10 rounded-lg flex flex-col gap-3">
        <h1>Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
