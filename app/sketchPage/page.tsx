// "use client";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { ArticleType } from "@/lib/types";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// type Props = {
//   open: boolean;
// };

// const HomeSideBar = ({ open }: Props) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const [loading, setLoading] = useState<boolean>(false);
//   const [articles, setArticles] = useState<ArticleType[]>([]);
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   const getArticles = async () => {
//     setLoading(true);
//     const result = await axios.get("/api/summarizer");
//     const data = await result.data;
//     // console.log(data);
//     console.log(data.articles, "data");
//     setArticles(data.articles);
//     setLoading(false);
//   };
//   // console.log(articles, " articles");
//   useEffect(() => {
//     getArticles();
//   }, []);

//   // const goToHistory = () => {
//   //   router.push("/history");
//   // };

//   const handleSelectedArticle = (id: number) => {
//     setSelectedId(id);
//     router.push(`/history?id=${id}`);
//   };

//   const selectedArticle = articles.find((article) => article.id === Number(id));

//   return (
//     <Sidebar className="z-10">
//       <SidebarContent className="pt-14 bg-white">
//         <SidebarGroup>
//           <div className="flex justify-between items-center">
//             <SidebarGroupLabel className="text-5 leading-7 font-semibold text-foreground">
//               History
//             </SidebarGroupLabel>
//             {open ? <SidebarTrigger className="w-6 h-6" /> : ""}
//           </div>

//           <SidebarGroupContent>
//             <SidebarMenu>
//               {articles?.map((article) => {
//                 // console.log("AAA", article);
//                 return (
//                   <SidebarMenuItem key={article.id}>
//                     <SidebarMenuButton
//                       asChild
//                       onClick={() => handleSelectedArticle(article.id)}
//                       className={`cursor-pointer ${
//                         selectedArticle?.id === article.id
//                           ? "bg-gray-100 font-semibold"
//                           : ""
//                       }`}
//                     >
//                       {/* <a href={article.url}>
//                     <item.icon />  */}
//                       <span className="cursor-default">{article.title}</span>
//                       {/* </a>  */}
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 );
//               })}
//             </SidebarMenu>
//             {/* {selectedArticle && (
//                 <SidebarMenuItem key={selectedArticle.id}>
//                   <SidebarMenuButton asChild onClick={goToHistory}>
//                     <a href={selectedArticle.url}>
//                     <item.icon />
//                     <span className="cursor-default">
//                       {selectedArticle.title}
//                     </span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               )} */}
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export default HomeSideBar;

// "use client";
// import { useState, useEffect } from "react";
// import { AdminLayout } from "../(protected)/AdminLayout";
// import { Button } from "@/components/ui/button";

// export default function QuizzesPage() {
//   const [quiz, setQuiz] = useState([]); // асуултууд
//   const [currentQuestion, setCurrentQuestion] = useState(0); // одоогийн асуулт
//   const [score, setScore] = useState(0); // оноо
//   const [isCompleted, setIsCompleted] = useState(false); // дууссан эсэх
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//   // 🧩 Backend-ээс quiz авах
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const response = await fetch("/api/quiz");
//       const data = await response.json();
//       setQuiz(data.quiz);
//     };
//     fetchQuiz();
//   }, []);

//   // 🧮 Хариулт шалгах функц
//   const handleAnswer = (answer) => {
//     const correct = quiz[currentQuestion].correctAnswer;
//     if (answer === correct) {
//       setScore(score + 1);
//     }

//     setSelectedAnswer(answer);

//     // 1 секундийн дараа дараагийн асуулт руу шилжих
//     setTimeout(() => {
//       if (currentQuestion + 1 < quiz.length) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer(null);
//       } else {
//         setIsCompleted(true);
//       }
//     }, 800);
//   };

//   // 🔁 Дахин эхлүүлэх
//   const restartQuiz = () => {
//     setScore(0);
//     setCurrentQuestion(0);
//     setIsCompleted(false);
//   };

//   // 🧾 Quiz дууссан үед
//   if (isCompleted) {
//     return (
//       <AdminLayout>
//         <div className="flex flex-col items-center justify-center h-screen">
//           <h1 className="text-3xl font-bold mb-2">✨ Quiz completed</h1>
//           <p className="text-lg mb-4">
//             Your score: {score} / {quiz.length}
//           </p>

//           {quiz.map((q, i) => (
//             <div key={i} className="text-left mb-3 border-b pb-2 w-[400px]">
//               <p className="font-semibold">
//                 {i + 1}. {q.question}
//               </p>
//               <p className="text-sm text-red-500">
//                 Your answer: {q.userAnswer || "Not answered"}
//               </p>
//               <p className="text-sm text-green-600">
//                 Correct: {q.correctAnswer}
//               </p>
//             </div>
//           ))}

//           <div className="flex gap-4 mt-5">
//             <Button onClick={restartQuiz} className="bg-white text-black border">
//               Restart quiz
//             </Button>
//             <Button className="bg-black text-white">Save and leave</Button>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   // 🧭 Quiz асуултууд харагдах хэсэг
//   if (quiz.length === 0) return <div>Loading quiz...</div>;

//   const question = quiz[currentQuestion];

//   return (
//     <AdminLayout>
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h2 className="text-xl font-semibold mb-4">
//           Question {currentQuestion + 1} / {quiz.length}
//         </h2>
//         <div className="w-[400px] border p-6 rounded-lg bg-white shadow">
//           <h3 className="font-semibold mb-4">{question.question}</h3>
//           <div className="flex flex-col gap-2">
//             {question.options.map((opt, i) => (
//               <Button
//                 key={i}
//                 disabled={selectedAnswer !== null}
//                 onClick={() => handleAnswer(opt)}
//                 className={`border ${
//                   selectedAnswer === opt
//                     ? opt === question.correctAnswer
//                       ? "bg-green-200"
//                       : "bg-red-200"
//                     : ""
//                 }`}
//               >
//                 {opt}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }
