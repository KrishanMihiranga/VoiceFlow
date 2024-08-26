import TextReader from "@/components/TextReader";

export default function Home() {
  return (
    <main>
      <div className="text-center my-10">
        <h1 className="text-[#4DE438] text-3xl font-extrabold tracking-tight mb-2 opacity-90">
          Voice Flow
        </h1>
        <h3 className="text-lg text-gray-600 font-medium leading-relaxed">
          An elegant reading experience. Just press play.
        </h3>
      </div>
      <TextReader />
    </main>
  );
}
