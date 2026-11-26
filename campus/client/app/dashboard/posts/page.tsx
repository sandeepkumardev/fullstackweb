"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    console.log("database open");

    return () => {
      console.log("database close");
    };
  }, []);
  return (
    <div>
      Posts page
      <br />
      <Link href={"/dashboard"}>Back</Link>
    </div>
  );
};

export default Page;
