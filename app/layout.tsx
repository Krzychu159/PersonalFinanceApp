import "./globals.css";
import { Public_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={publicSans.variable}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
