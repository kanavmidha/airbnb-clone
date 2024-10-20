'use client'

import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

export default function RegisterModal () {

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
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
        .then(()=>{
            toast.success("Registered successfully!")
            registerModal.onClose()
            loginModal.onOpen()
        })
        .catch(()=> {
            toast.error("Oops!")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    const toggle = useCallback(() => {
        loginModal.onOpen()
        registerModal.onClose()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Create an account!"
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
            id="name"
            label="Name"
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
                onClick={()=> signIn('google')}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
            ">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle}
                     className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline
                    ">
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            body={bodyContent}
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    )
}