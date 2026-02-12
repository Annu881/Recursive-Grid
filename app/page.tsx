
import RecursiveGrid from "@/components/RecursiveGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Recursive Grid</h1>
      <RecursiveGrid />
    </main>
  );
}
