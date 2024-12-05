
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Please Login To Continue</h1>
      <Link href={'/dashboard'}>
        <Button className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300">
          Sign In
        </Button>
      </Link>
    </div>
  );
}
