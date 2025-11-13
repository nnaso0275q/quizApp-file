import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { summary, articleId } = await req.json();
  console.log("==========================");
  console.log("Quiziin backendiin summary", summary);
  console.log("==========================");
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: summary,
    config: {
      systemInstruction: `
  You are a JSON generator. Output only valid JSON.
  Do not include markdown, explanations, or code fences.
  Return a JSON array of 5 objects with keys:
  "question", "options" (array of 4 strings), "correctAnswer".
  Summary: ${summary}
`,
    },
  });

  const quizJson =
    response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  console.log("=========", quizJson);
  console.log("Raw AI response:", response.text);

  if (!quizJson) {
    return NextResponse.json({ quiz: [] });
  }

  const cleaned = quizJson
    .replace(/```json|```/gi, "")
    .replace(/\n/g, " ")
    .trim();

  let quizArray: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[] = [];

  try {
    quizArray = JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse quiz JSON:", error);
    console.log("Cleaned AI response:", quizJson);
    return NextResponse.json({ quiz: [] });
  }

  // try {
  //   for (const q of quizArray) {
  //     await prisma.quizzes.create({
  //       data: {
  //         question: q.question,
  //         options: q.options,
  //         answer: q.correctAnswer,
  //         articleId: articleId
  //     });
  //     console.log("quizzes saved");
  //   }
  // } catch (error) {
  //   console.log("Error");
  // }

  return NextResponse.json({ quiz: quizArray });
}
