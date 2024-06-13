import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizz Master",
  description: "Tech Quizz App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
        ></script>
      </body>
    </html>
  );
}
