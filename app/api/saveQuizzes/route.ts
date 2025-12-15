import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { articleId, quizzes } = await req.json();

  if (!articleId || !Array.isArray(quizzes) || quizzes.length === 0) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    await prisma.quizzes.createMany({
      data: quizzes.map((q: any) => ({
        question: q.question,
        options: q.options,
        answer: q.correctAnswer,
        articleid: Number(articleId), // createMany-д relation-ийг иймээр өгөх боломжтой
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save quizzes error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
