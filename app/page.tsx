import Image from "next/image"

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gray-700/80"></div>
          <div className="w-1/2 bg-yellow-600/70"></div>
        </div>

        <Image
          src="/hero-img.jpg"
          alt="Meal Maker background"
          fill
          className="object-cover opacity-30"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">Create. Cook. Enjoy.</h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto mb-6">
            Discover personalized recipes made by AI — just for your ingredients.
          </p>
          <button className="bg-emerald-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition">
            Let’s Cook!
          </button>
        </div>
      </section>
    </div>
  )
}
