'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"

export default function UserMenu ({currentUser}) {

    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    }, [])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={()=>{}}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                rounded-full
                px-4
                py-3
                hover:bg-neutral-100
                transition
                cursor-pointer"
                >Airbnb Your Home</div>
                <div onClick={toggleOpen} 
                className="
                p-4
                md:px-2
                md:py-1
                rounded-full
                border-[1px]
                border-neutral-200
                transition
                hover:shadow-md
                cursor-pointer
                flex
                flex-row
                items-center
                ">
                    <AiOutlineMenu/>
                    <div className="hidden md:block ml-3">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={()=>{}}
                                    label="My Trips"
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label="My Favourites"
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label="My Reservations"
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label="My Properties"
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label="Airbnb my home"
                                />
                                <hr/>
                                <MenuItem
                                    onClick={()=>signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
