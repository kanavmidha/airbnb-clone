import "./globals.css";
import { Nunito } from "next/font/google"
import Navbar from "@/app/components/navbar/Navbar"
import ToasterProvider from "./components/providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";

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
        <SearchModal/>
        <RegisterModal/>
        <LoginModal/>
        <RentModal/>
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
