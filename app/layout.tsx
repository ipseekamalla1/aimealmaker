import "./globals.css";
import Providers from "@/components/Providers";
import ClientNavbar from "@/components/ClientNavbar";

export const metadata = {
  title: "MealMaker",
  description: "AI-powered meal planner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <ClientNavbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
