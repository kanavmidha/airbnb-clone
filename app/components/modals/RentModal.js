'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";

const STEPS = {
    Category: 0,
    Location: 1,
    Info: 2,
    Images: 3,
    Description: 4,
    Price: 5
}

export default function RentModal () {

    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.Category)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category')
    const location = watch('location')

    const setCustomValue = (id, value) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        }) 
    }

    const onBack = () => {
        setStep((value)=> value - 1)
    }

    const onNext = () => {
        setStep((value)=> value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.Price) {
            return "Create"
        }

         return "Next"
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.Category) {
            return undefined
        }

        return "Back"
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a Category"
            />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            ">
                {categories.map((item)=>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category)=> setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                    )
                )}
            </div>
        </div>
    )
    // We use let instead of const as this variable is going to be dynamic and will change according to the step we are on!

    if (step === STEPS.Location) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value)=> setCustomValue('location', value)}
                />
                <Map/>
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.Category ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    )
}