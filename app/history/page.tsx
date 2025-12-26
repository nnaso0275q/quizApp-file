"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function History() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const summary = searchParams.get("summary") || "";
  const articlePromtParam = searchParams.get("articlePromt") || "";

  const [articlePromt, setArticlePromt] = useState(articlePromtParam);

  useEffect(() => {
    const saved = localStorage.getItem("articlePromt");
    if (saved) setArticlePromt(JSON.parse(saved));
  }, []);

  return (
    <>
      <ChevronLeft
        className="w-12 h-10 border rounded-md ml-20 mt-12 hover:bg-gray-100 cursor-pointer"
        onClick={() => router.back()}
      />

      <div className="w-[856px] h-fit bg-white border rounded-xl mt-6 ml-20 p-7">
        <div className="flex items-center gap-2">
          <Image src="/Article.svg" alt="article" width={24} height={24} />
          <div className="font-semibold text-2xl">Article Quiz Generator</div>
        </div>

        <div className="flex items-center gap-2 pt-5">
          <Image src="/book.svg" alt="book" width={20} height={20} />
          <div className="text-[#71717A]">Summarized content</div>
        </div>

        <div className="font-semibold text-2xl mt-2">{title}</div>
        <div className="font-normal text-sm mt-2">{summary}</div>

        <div className="flex items-center gap-1 mt-5">
          <Image src="/file.svg" alt="file" width={11} height={13} />
          <div className="font-semibold text-sm text-muted-foreground">Article Content</div>
        </div>

        <div className="font-normal text-sm mt-2 whitespace-pre-line">{articlePromt}</div>

        <Button className="h-10 mt-5" type="submit">
          Take a quiz
        </Button>
      </div>
    </>
  );
}
