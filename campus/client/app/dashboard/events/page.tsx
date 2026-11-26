import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      Events page
      <br />
      <Link href={"/dashboard"}>Back</Link>
    </div>
  );
};

export default Page;
