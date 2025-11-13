"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function History() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "";
  const summary = searchParams.get("summary") || "";
  const articlePromt = searchParams.get("articlePromt") || "";

  const [promt, setPromt] = useState<string>("");

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
          <img className="w-[11px] h-[13px]" src="/file.svg"></img>
          <div className="font-semibold text-sm text-muted-foreground">
            Article Content
          </div>
        </div>
        <div className="font-normal text-sm mt-2 whitespace-pre-line">
          {articlePromt}
        </div>

        <Button className="h-10 mt-5" type="submit">
          Take a quiz
        </Button>
      </div>
    </>
  );
}
