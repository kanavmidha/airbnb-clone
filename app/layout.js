import "./globals.css";
import { Nunito } from "next/font/google"
import Navbar from "@/app/components/navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({
  subsets:['latin']
})

export const metadata = {
  title: "Airbnb Clone",
  description: "This is an Airbnb clone created by Kanav Midha. This is intended to be a personal project, not for monetization purposes.",
};

export default async function RootLayout({ children }) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
