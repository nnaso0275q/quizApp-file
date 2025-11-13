"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "";
  const summary = searchParams.get("summary") || "";
  const articlePromt = searchParams.get("articlePromt") || "";

  const [loading, setLoading] = useState(false);

  const handleTakeQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary }),
      });
      const data = await response.json();

      router.push(
        `/quizzes?title=${encodeURIComponent(
          title
        )}&summary=${encodeURIComponent(summary)}`
      );
    } catch (error) {
      console.log("Error:", error);
      alert("failed");
    }
  };

  const history = async () => {
    router.push(
      `/history?title=${encodeURIComponent(title)}
      &summary=${encodeURIComponent(summary)}&articlePromt=${encodeURIComponent(
        articlePromt
      )}`
    );
  };

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

        <div className="flex items-center justify-between mt-5">
          <Button
            className="h-10 bg-white border text-black"
            type="submit"
            onClick={history}
          >
            See content
          </Button>

          <Button
            className="h-10"
            type="submit"
            onClick={handleTakeQuiz}
            disabled={loading || !summary}
          >
            {loading ? "Loading..." : " Take a quiz"}
          </Button>
        </div>
      </div>
    </>
  );
}
