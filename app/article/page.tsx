"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [articlePromt, setArticlePromt] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const createSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articlePromt, title, summary }),
      });
      const data = await response.json();

      if (data.message) {
        localStorage.setItem("articlePromt", JSON.stringify(articlePromt));

        router.push(
          `/summarizeArticle?title=${encodeURIComponent(
            title
          )}&summary=${encodeURIComponent(
            data.message
          )}&articlePromt=${encodeURIComponent(articlePromt)}`
        );
      }

      // articleId => state uusgej zadlaad useRouter eeree damjuulahuu g bodjiin

      // if (data.message) {
      //   const newArticle: ArticleType = { id: Date.now(), title };

      //   const existing = JSON.parse(localStorage.getItem("articles") || "[]");

      //   localStorage.setItem("articlePromt", JSON.stringify(articlePromt));

      //   localStorage.setItem(
      //     "articles",
      //     JSON.stringify([...existing, newArticle])
      //   );
      //   router.push(
      //     `/summarizeArticle?title=${encodeURIComponent(
      //       newArticle.title
      //     )}&summary=${encodeURIComponent(
      //       data.message
      //     )}&articlePromt=${encodeURIComponent(articlePromt)}`
      //   );
      // }
      setSummary(data.message);
    } catch (error) {
      console.log("Error:", error);
      alert("failed");
    }
  };
  return (
    <div>
      <div className="w-[628px] h-[442px] bg-white border rounded-xl mt-6 mx-auto ml-50">
        <div className="p-7">
          <div className="flex items-center gap-2">
            <img src="/Article.svg"></img>
            <div className="font-semibold text-2xl">Article Quiz Generator</div>
          </div>

          <div className="space-y-5 ">
            <div className="text-[#71717A] pt-2">
              Paste your article below to generate a summarize and quiz
              question. Your articles will saved in the sidebar for future
              reference.
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                <div className="font-semibold text-sm text-muted-foreground">
                  Article Title
                </div>
              </div>

              <Input
                className="mt-1"
                placeholder="Enter a title for your article..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                <div className="font-semibold text-sm text-muted-foreground">
                  Article Content
                </div>
              </div>

              <Textarea
                className="mt-1 h-[120px]"
                placeholder="Enter a title for your article..."
                value={articlePromt}
                onChange={(e) => setArticlePromt(e.target.value)}
              ></Textarea>
            </div>

            <Button
              className="h-10"
              onClick={createSummary}
              type="submit"
              disabled={loading || !articlePromt}
            >
              {loading ? "Loading..." : "Generate summary"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
