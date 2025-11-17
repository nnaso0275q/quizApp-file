import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const articles = await prisma.articles.findUnique({
//     where: { id: Number(params.id) },
//   });
//   console.log("----article----", articles);
//   if (!articles) {
//     return NextResponse.json({ error: "Article not found" }, { status: 404 });
//   }

//   return NextResponse.json(articles);
// }

export async function POST(req: NextRequest) {
  const { articlePromt, summary, title } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: articlePromt,
    config: {
      systemInstruction: ` You have to make a short summary of the submitted content within 5 sentences. ${summary}`,
    },
  });
  // console.log({ response });

  const text = response.text;
  try {
    const article = await prisma.articles.create({
      data: {
        title: title,
        content: articlePromt,
        summery: text,
      },
    });
    console.log("=== articleId: article.id ===", article.id);
    return NextResponse.json({ message: response.text, articleId: article.id });
  } catch (error) {
    // console.log(response.data);
    // return NextResponse.json({ message: "failed" });
  }

  console.log(response.text);
  return NextResponse.json({ message: response.text });
}
