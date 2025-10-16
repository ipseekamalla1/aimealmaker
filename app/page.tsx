import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 pt-24">
        {/* Your main page content */}
      </div>
    </>
  );
}
