'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"
import ClientOnly from "./components/ClientOnly"

export default function ErrorState({error}) {
    useEffect(() => {
        console.error(error)
    },[error])

    return (
        <ClientOnly>
            <EmptyState
                title="Uh Oh"
                subtitle="Something went wrong!"
            />
        </ClientOnly>
    )
}