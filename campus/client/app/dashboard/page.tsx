import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      Dashboard page
      <br />
      <Link href="/dashboard/events">Evnets</Link>
      <br />
      <Link href="/dashboard/posts">Posts</Link>
    </div>
  );
};

export default Page;
