
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { summary, articleId } = await req.json();

  if (!summary || !articleId) {
    return NextResponse.json({ quiz: [], error: "Missing summary or articleId" });
  }

  let quizArray = [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: summary,
      config: {
        systemInstruction: `
          Output JSON array of 5 objects: 
          { question, options (array of 4), correctAnswer }
        `,
      },
    });

    const quizJson = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const cleaned = quizJson.replace(/```json|```/gi, "").replace(/\n/g, " ").trim();

    quizArray = JSON.parse(cleaned);

    for (const q of quizArray) {
      await prisma.quizzes.create({
        data: {
          question: q.question,
          options: q.options,
          answer: q.correctAnswer,
          articles: { connect: { id: Number(articleId) } },  
        },
      });
    }
  } catch (error) {
    console.error("Quiz generate/save error:", error);
  }

  return NextResponse.json({ quiz: quizArray });
}
