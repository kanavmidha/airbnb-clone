import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import TripsClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
import ClientOnly from "../components/ClientOnly";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()
  
  if(!currentUser) {
    return (
        <EmptyState
            title="Unauthorized"
            subtitle="Please Login"
        />
    )
  }

  const listings = await getListings({
    userId: currentUser.id
  })

  if (listings.length === 0) {
    return(
      <ClientOnly>
        <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    )
  }

  return(
    <PropertiesClient
        listings={listings}
        currentUser={currentUser}
    />
  )
}