import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { articleId, quizzes } = await req.json();

  if (!Array.isArray(quizzes)) {
    return NextResponse.json({ error: "Invalid quizzes array" }, { status: 400 });
  }

  
  const articleExists = await prisma.articles.findUnique({
    where: { id: Number(articleId) },
  });

  if (!articleExists) {
    return NextResponse.json({ error: "Article does not exist" }, { status: 400 });
  }

  try {
    for (const q of quizzes) {
      await prisma.quizzes.create({
        data: {
          question: q.question,
          options: q.options,
          answer: q.correctAnswer,
          articleid: Number(articleId),
        },
      });
    }

    return NextResponse.json({ success: true }); 
  } catch (error) {
    console.error("Failed to save quizzes:", error);
    return NextResponse.json({ error: "Failed to save quizzes" }, { status: 500 });
  }
}
