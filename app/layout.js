import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

const robotoBlack = localFont({
  src: "./fonts/Roboto-Black.ttf",
  variable: "--font-roboto-black",
  weight: "100 900",
});

export const metadata = {
  title: "Рыбный мост",
  description: "Сайт для продажи рыбы",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoBlack.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>

    </html>
  );
}
