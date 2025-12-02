import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { articlePromt, summary, title } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: articlePromt,
      config: {
        systemInstruction: `You have to make a short summary of the submitted content within 5 sentences. ${summary}`,
      },
    });

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("AI SUMMARY:", text);

    if (!text) {
      return NextResponse.json({
        error: true,
        message: "No text returned from model",
      });
    }

    const article = await prisma.articles.create({
      data: {
        title,
        content: articlePromt,
        summery: text,
      },
    });

    return NextResponse.json({
      message: text,
      articleId: article.id,
    });
  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({
      error: true,
      message: "Backend failed",
    });
  }
}




// import { prisma } from "@/lib/prisma";
// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// export async function POST(req: NextRequest) {
//   const { articlePromt, summary, title } = await req.json();

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: articlePromt,
//     config: {
//       systemInstruction: ` You have to make a short summary of the submitted content within 5 sentences. ${summary}`,
//     },
//   });
//   // console.log({ response });

//   const text = response.text;
//   try {
//     const article = await prisma.articles.create({
//       data: {
//         title: title,
//         content: articlePromt,
//         summery: text,
//       },
//     });
//     console.log("=== articleId: article.id ===", article.id);
//     return NextResponse.json({ message: response.text, articleId: article.id });
//   } catch (error) {
//     // console.log(response.data);
//     // return NextResponse.json({ message: "failed" });
//   }

//   console.log(response.text);
//   return NextResponse.json({ message: response.text });
// }
