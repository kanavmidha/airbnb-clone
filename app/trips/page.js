import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import ClientOnly from "../components/ClientOnly";

export default async function TripsPage() {
  const currentUser = await getCurrentUser()
  
  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
            title="Unauthorized"
            subtitle="Please Login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })

  if (reservations.length === 0) {
    return(
      <ClientOnly>
        <EmptyState
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }

  return(
    <TripsClient
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}