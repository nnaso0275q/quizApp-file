// 

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HistoryProps {
  searchParams: {
    title?: string;
    summary?: string;
    articlePromt?: string;
  };
}

const History = ({ searchParams }: HistoryProps) => {
  const router = useRouter();
  const { title = "", summary = "", articlePromt = "" } = searchParams;
  const [promt, setPromt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("articlePromt");
    if (saved) setPromt(JSON.parse(saved));
  }, []);

  return (
    <>
      <ChevronLeft
        className="w-12 h-10 border rounded-md ml-20 mt-12 hover:bg-gray-100"
        onClick={() => router.back()}
      />

      <div className="w-[856px] h-fit bg-white border rounded-xl mt-6 ml-20 p-7">
        <div className="flex items-center gap-2">
          <img src="/Article.svg" alt="article" />
          <div className="font-semibold text-2xl">Article Quiz Generator</div>
        </div>

        <div className="flex items-center gap-2 pt-5">
          <img src="/book.svg" alt="book" />
          <div className="text-[#71717A]">Summarized content</div>
        </div>

        <div className="font-semibold text-2xl mt-2">{title}</div>
        <div className="font-normal text-sm mt-2">{summary}</div>
        <div className="flex items-center gap-1 mt-5">
          <img className="w-[11px] h-[13px]" src="/file.svg" />
          <div className="font-semibold text-sm text-muted-foreground">Article Content</div>
        </div>
        <div className="font-normal text-sm mt-2 whitespace-pre-line">{articlePromt}</div>

        <Button className="h-10 mt-5" type="submit">
          Take a quiz
        </Button>
      </div>
    </>
  );
};

export default History;
