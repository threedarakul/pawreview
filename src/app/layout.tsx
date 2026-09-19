import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading-latin",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const thaiFont = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PawReview",
  description: "ระบบติดตามวันครบกำหนด Review พนักงาน",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${headingFont.variable} ${bodyFont.variable} ${thaiFont.variable} h-full antialiased`}
      style={
        {
          "--font-heading": `var(--font-heading-latin), var(--font-thai), sans-serif`,
          "--font-body": `var(--font-body-latin), var(--font-thai), sans-serif`,
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
