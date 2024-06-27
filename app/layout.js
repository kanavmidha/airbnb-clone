import "./globals.css";
import { Nunito } from "next/font/google"
import Navbar from "@/app/components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";

const font = Nunito({
  subsets:['latin']
})

export const metadata = {
  title: "Airbnb Clone",
  description: "This is an Airbnb clone created by Kanav Midha. This is intended to be a personal project, not for monetization purposes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
