// import { prisma } from "@/lib/prisma";
// import { NextRequest } from "next/server";

// export const GET = async () => {
//   const articles = await prisma.articles.findMany({
//     where: {
//       age: {
//         gt: 18,
//         gte: 12,
//         lt: 17,
//         lte: 23,
//       },
//     },
//   });
//   return Response.json({ message: "success", data: articles });
// };

// export const POST = async (request: NextRequest) => {
//   const body = await request.json();

//   const newArticles = await prisma.articles.create({
//     data: {},
//   });
//   return Response.json({ message: "successfully added", data: newArticles });
// };

// export const GET = async () => {
//   const students = await prisma.students.findMany({
//     where: {
//       age: {
//         gt: 18,
//         gte: 12,
//         lt: 17,
//         lte: 23,
//       },
//     },
//   });
//   return Response.json({ message: "success", data: students });
// };

// export const POST = async (request: NextRequest) => {
//   const body = await request.json();

//   const newStudent = await prisma.students.create({
//     data: {
//       name: "",
//       age: 1,
//     },
//   });
//   return Response.json({ message: "successfully added", data: newStudent });
// };
