"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 shadow-md md:p-6">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row">
        <Link href="/" className="mb-4 text-xl font-bold md:mb-0">
          Next-Auth
        </Link>

        {status === "loading" && <p>Loading...</p>}

        {status === "authenticated" && (
          <div className="flex items-center">
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        )}

        {status === "unauthenticated" && (
          <Button asChild className="w-full md:w-auto">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
