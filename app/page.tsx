"use client";

import { useState } from "react";

export default function RPLApp() {
  const [formData, setFormData] = useState({
    topic: "Manajemen Waktu dan Regulasi Diri dalam Belajar",
    grade: "VII",
    phase: "D",
    duration: "2 x 40",
    serviceField: "Belajar",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOutput(data.rpl);
    } catch (err: any) {
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Kurikulum Merdeka &bull; Deep Learning
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Generator RPL BK Profesional
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Standar POP BK dengan Sintaks Experiential Learning (David Kolb)
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Topik / Tema Layanan
              </label>
              <input
                type="text"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Bidang Bimbingan
              </label>
              <select
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={formData.serviceField}
                onChange={(e) => setFormData({ ...formData, serviceField: e.target.value })}
              >
                <option value="Pribadi">Pribadi</option>
                <option value="Sosial">Sosial</option>
                <option value="Belajar">Belajar</option>
                <option value="Karir">Karir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Alokasi Waktu (Menit)
              </label>
              <input
                type="text"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Kelas
              </label>
              <input
                type="text"
                placeholder="Contoh: VII atau X"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fase
              </label>
              <select
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={formData.phase}
                onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
              >
                <option value="D">Fase D (SMP / MTs)</option>
                <option value="E">Fase E (SMA / SMK Kelas X)</option>
                <option value="F">Fase F (SMA / SMK Kelas XI-XII)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? "Menyusun RPL Berbasis Experiential Learning..." : "Generate RPL BK Sekarang"}
          </button>
        </section>

        {output && (
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-bold text-slate-800 text-lg">Hasil Rencana Pelaksanaan Layanan (RPL)</h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border transition"
              >
                {copied ? "Tersalin!" : "Salin Format"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed overflow-x-auto bg-slate-50 p-4 rounded-xl border">
              {output}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
