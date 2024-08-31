"use client";
import { SignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="flex justify-center w-full h-screen items-center bg-[#20212C]">
      {!isClient ? (
        <div>loading</div>
      ) : (
        <SignIn path="/login" signUpUrl="/sign-up" forceRedirectUrl="/" />
      )}
    </section>
  );
}
