import "./globals.css";
import { Nunito } from "next/font/google"
import Navbar from "@/app/components/navbar/Navbar"
import ToasterProvider from "./components/providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
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
        <RentModal/>
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
