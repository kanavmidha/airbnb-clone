'use client'

import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"

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

    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}