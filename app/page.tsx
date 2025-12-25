"use client"
import Article from "@/app/article/page";
import { Suspense } from "react";

export default function Home() {
  return (
      <Suspense>
         <Article></Article>
      </Suspense>
  );
}


