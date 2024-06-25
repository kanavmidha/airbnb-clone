'use client'

import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"

export default function RegisterModal () {

    const registerModal = useRegisterModal()
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
            registerModal.onClose()
        })
        .catch((error)=> {
            console.log(error)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

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
            register={register}
            errors={errors}
            disabled={isLoading}
            required
            />
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
        />
    )
}