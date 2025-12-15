"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const summary = searchParams.get("summary") || "";
  const id = searchParams.get("id");
  console.log("quizzesruu searchParamsaar irsen id", id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const [showNext, setShowNext] = useState(false);

  const [quizzes, setQuizzes] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);

  const [answer, setAnswer] = useState<
    { question: string; userAnswer: string; correctAnswer: string }[]
  >([]);

  const currentQuiz = quizzes[currentIndex];




  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, articleid: id }),
      });

      const data = await response.json();
      console.log({ data });
      if (Array.isArray(data.quiz)) {
        setQuizzes(data.quiz);
      } else {
        console.log("Unexpected quiz format:", data);
        setQuizzes([]);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    setShowNext(true);
    if (option === currentQuiz.correctAnswer) setScore((prev) => prev + 1);

    setAnswer((prev) => [
      ...prev,
      {
        question: currentQuiz.question,
        userAnswer: option,
        correctAnswer: currentQuiz.correctAnswer,
      },
    ]);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowNext(false);
    setCurrentIndex((prev) => prev + 1);
  };

const saveQuizzesToNeon = async () => {
  if (!id || !quizzes || quizzes.length === 0) return;

  const response = await fetch("/api/saveQuizzes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleId: Number(id), quizzes }),
  });

  const data = await response.json();
  if (data.success) router.back();
};




// const saveQuizzesToNeon = async () => {
//   try {
//     const response = await fetch("/api/saveQuizzes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ articleId: id, quizzes }),
//     });

//     if (!response.ok) {
//       const text = await response.text();
//       console.error("Backend returned non-OK:", text);
//       alert("Failed to save quizzes.");
//       return;
//     }

//     console.log("Sending articleId to backend:", id);
//     const data = await response.json();
//     if (data.success) {
//       alert("Quizzes saved successfully!");
//       router.back();
//     } else {
//       console.error(data.error);
//       alert("Failed to save quizzes.");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Failed to save quizzes.");
//   }
// };




  return (
    <>
      <div className="mx-50 my-[120px]">
        <div className="flex items-center w-[558px] justify-between">
          <div className="flex items-center gap-2 ">
            <img src="/Article.svg" alt="article" />
            <div className="font-semibold text-2xl">Quick test</div>
          </div>

          {/*  */}
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="w-12 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
                <img className="px-4 py-3" src="/x.svg" alt="close" />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 w-[450px] h-fit">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-semibold text-2xl">
                  Are yous sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1.5 text-[#B91C1C] leading-5 text-sm font-normal">
                  If you press 'Cancel', this quiz will restart from the
                  beginning.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 justify-between">
                <AlertDialogCancel
                  className="w-[179px] bg-black text-white hover:bg-gray-300 hover:text-black"
                  // onClick={() => router.back()}
                >
                  Go back
                </AlertDialogCancel>
                <AlertDialogAction className="bg-white text-black border w-[179px] hover:bg-gray-300">
                  Cancel quiz
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/*  */}
        </div>

        <div className="text-[#71717A] font-medium text-base w-[558px] mb-6">
          Take a quick test about your knowledge from your content
        </div>

        <div className="mt-6 w-[558px] border bg-white rounded-md h-fit p-6">
          {!quizzes || quizzes.length === 0 ? (
            <div className="text-gray-500">Loading quiz.......</div>
          ) : currentIndex < quizzes.length ? (
            <div>
              <div className="font-semibold text-lg mb-4">
                {currentIndex + 1}. {currentQuiz.question}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentQuiz.options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => handleAnswerClick(option)}
                    className={`border-2 rounded-md w-[243px] h-20 flex items-center px-4 cursor-pointer transition
                      ${
                        selectedAnswer === option
                          ? option === currentQuiz.correctAnswer
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {showNext && (
                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextQuestion}>Next</Button>
                </div>
              )}
            </div>
          ) : (
            <div className=" p-7">
              <div className="text-2xl font-semibold flex items-center gap-1">
                Your score: {score}
                <span className="font-medium text-base text-muted-foreground">
                  / {quizzes.length}
                </span>
              </div>

              <div className="mt-7 space-y-5">
                {answer.map((a, i) => (
                  <div key={i} className="border p-3 rounded-md">
                    <div className="text-muted-foreground font-medium text-xs">
                      {i + 1}. {a.question}
                    </div>
                    <div
                      className={`mt-1 ${
                        a.userAnswer === a.correctAnswer
                          ? "text-green-500 text-xs font-medium"
                          : "text-red-500 font-medium text-xs "
                      }`}
                    >
                      Your answer: {a.userAnswer}
                    </div>
                    {a.userAnswer !== a.correctAnswer && (
                      <div className="text-green-500 text-xs font-medium">
                        Correct: {a.correctAnswer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-7 justify-between flex">
                <Button
                  className="bg-white text-black border flex items-center"
                  onClick={() => router.back()}
                >
                  <img src="/reload.svg"></img>
                  Restart quiz
                </Button>
                <Button className="flex items-center" onClick={saveQuizzesToNeon}>
                  <img src="/bookmark.svg"></img>
                  Save and leave
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
