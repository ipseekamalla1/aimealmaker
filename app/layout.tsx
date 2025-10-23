import "./globals.css"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"

export const metadata = {
  title: "MealMaker",
  description: "AI-powered meal planner",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
