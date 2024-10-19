'use client'

import toast from "react-hot-toast"
import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCard from "../components/listings/ListingCard"

export default function ReservationsClient({
    reservations,
    currentUser
}) {
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
        </Container>
    )
}