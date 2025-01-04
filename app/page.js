"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // For authentication check

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Check if the user is signed in

  useEffect(() => {
    // If not signed in, redirect to login page
    if (!isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return null; // No content to render as the page redirects
}

