'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

export default function ErrorState({error}) {
    useEffect(() => {
        console.error(error)
    },[error])

    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!"
        />
    )
}