import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { BK_SYSTEM_PROMPT } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const { topic, grade, phase, duration, serviceField } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum dikonfigurasi di Environment Variables." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const userPrompt = `
Susunlah RPL Bimbingan Klasikal Format POP BK Kurikulum Merdeka:
- Topik/Tema: ${topic}
- Sasaran: Kelas ${grade} (Fase ${phase})
- Alokasi Waktu: ${duration} Menit
- Bidang Bimbingan: ${serviceField}
- Pendekatan: Experiential Learning terintegrasi Deep Learning (Mindful, Meaningful, Joyful).

Sertakan lampiran uraian materi pemantik dan lembar kerja peserta didik (LKPD) reflektif.
`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: BK_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const resultText = response.text || "Tidak ada teks yang dihasilkan.";
    return NextResponse.json({ rpl: resultText });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Terjadi kesalahan saat memproses RPL." },
      { status: 500 }
    );
  }
}
