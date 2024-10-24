'use client'
import useCountries from '@/app/hooks/useCountries'
import useSearchModal from '@/app/hooks/useSearchModal'
import { differenceInCalendarDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import {BiSearch} from 'react-icons/bi'

export default function Search () {
    const searchModal = useSearchModal()
    const params = useSearchParams()
    const { getByValue } = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if(locationValue) {
            return getByValue(locationValue)?.label
        }

        return 'Anywhere'
    }, [getByValue, locationValue])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            let diff = differenceInCalendarDays(end, start)

            if (diff === 0) {
                diff = 1
            }

            return `${diff} Days`
        }

        return "Any Week"
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }

        return 'Add Guests'
    }, [guestCount])

    return(
        <div onClick={searchModal.onOpen} 
        className="
        border-[1px]
        w-full
        md:w-auto
        rounded-full
        transition
        shadow-sm
        hover:shadow-md
        cursor-pointer
        py-2
        ">
            <div className="
            flex
            flex-row
            items-center
            justify-between
            ">
                <div className="
                    text-sm
                    font-semibold
                    px-6
                ">
                    {locationLabel}
                </div>

                <div className="
                hidden
                sm:block
                text-sm
                font-semibold
                border-x-[1px]
                text-center
                flex-1
                px-6
                ">
                    {durationLabel}
                </div>

                <div className="text-sm
                pl-6
                pr-2
                text-gray-600
                flex
                flex-row
                items-center
                gap-3">
                    <div className="hidden sm:block">{guestLabel}</div>
                    <div className="
                    p-2
                    bg-rose-500
                    text-white
                    rounded-full">
                        <BiSearch size={18}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
