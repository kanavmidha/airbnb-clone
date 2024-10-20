'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"

export default function LoginModal () {

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback)=>{
            setIsLoading(false)

            if(callback?.ok) {

                toast.success(`Welcome!`)
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Login to you account"
            />
            <Input
            id="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            />
            <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
            ">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        First time using Airbnb?
                    </div>
                    <div onClick={toggle}
                     className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline
                    ">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            body={bodyContent}
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    )
}