import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BK_SYSTEM_PROMPT } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { topic, grade, phase, duration, serviceField } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum diisi di Vercel Environment Variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: BK_SYSTEM_PROMPT,
    });

    const userPrompt = `
Susunlah RPL Bimbingan Klasikal Format POP BK Kurikulum Merdeka:
- Topik/Tema: ${topic}
- Sasaran: Kelas ${grade} (Fase ${phase})
- Alokasi Waktu: ${duration} Menit
- Bidang Bimbingan: ${serviceField}
- Pendekatan: Experiential Learning terintegrasi Deep Learning (Mindful, Meaningful, Joyful).

Sertakan lampiran uraian materi pemantik dan lembar kerja peserta didik (LKPD) reflektif.
`;

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    return NextResponse.json({ rpl: responseText });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Gagal memproses RPL." },
      { status: 500 }
    );
  }
}