"use client"

import { IconClose } from "@/app/components/layout/Icons"
import CreateContent from "@/app/feature/fundraisers/CreateContent"
import CreateDetails from "@/app/feature/fundraisers/CreateDetails"
import CreatePurpose from "@/app/feature/fundraisers/CreatePurpose"
import SectionTab from "@/app/feature/fundraisers/SectionTab"
import { Dog } from "@/app/types/dog.interface"
import { FundraiserSection } from "@/app/types/enum/fundraiserSection.enum"
import { RecipientType } from "@/app/types/enum/recipientType.enum"
import { CreateFundraiserDto } from "@/app/types/fundraiser.interface"
import { Shelter } from "@/app/types/shelter.interface"
import { User } from "@/app/types/user.interface"
import { RadioGroup } from "@headlessui/react"
import { S3 } from "aws-sdk"
import { PutObjectRequest } from "aws-sdk/clients/s3"
import { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"


export default function CreateFundRaiser({ searchParams }: { searchParams: any }) {

  const [selectedSection, setSelectedSection] = useState<FundraiserSection>(FundraiserSection.Purpose);
  const [type, setType] = useState<RecipientType>(RecipientType.Dog);
  const [dogId, setDogId] = useState<number | undefined>(undefined);
  const [shelterId, setShelterId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [purpose, setPurpose] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const { typeParam } = searchParams;

  const onSubmit = useCallback(() => {

    if (startDate && endDate) {
      const body: CreateFundraiserDto = {
        title,
        content,
        mainImage: mainImage,
        images,
        purpose,
        goal_amount: Number(goalAmount),
        current_amount: 0,
        starts_at: startDate,
        ends_at: endDate,
        created_at: new Date(),
        created_by: 1,
        type,
        shelter_id: shelterId ? shelterId : undefined,
        user_id: userId ? userId : undefined,
        dog_id: dogId ? dogId : undefined,
      }
    }

  }, [title, content, mainImage, images, purpose, goalAmount, startDate, endDate])


  const handleNextClick = useCallback((e: any) => {
    e.preventDefault();

    switch (e.target.value) {
      case FundraiserSection.Purpose:
        return setSelectedSection(FundraiserSection.Details)
      case FundraiserSection.Details:
        return setSelectedSection(FundraiserSection.Content)
    }
  }, [setSelectedSection])

  const handlePrevClick = useCallback((e: any) => {
    e.preventDefault();

    switch (e.target.value) {
      case FundraiserSection.Details:
        return setSelectedSection(FundraiserSection.Purpose)
      case FundraiserSection.Content:
        return setSelectedSection(FundraiserSection.Details)
    }
  }, [setSelectedSection])

  const isActive = useMemo(() => {
    if (selectedSection === FundraiserSection.Purpose) {
      return purpose !== '' && country !== ''
    } else if (selectedSection === FundraiserSection.Details) {
      return goalAmount !== '' && startDate !== null && endDate !== null
    } else if (selectedSection === FundraiserSection.Content) {
      return mainImage != '' && images.length !== 0 && content !== ''
    }
  }, [selectedSection, purpose, country, goalAmount, startDate, endDate, mainImage, images, content])

  return (
    <div className="bg-gray-100 py-20">

      <h1 className="text-2xl font-bold max-w-2xl mx-auto mb-4 text-center">Create a Fundraiser</h1>
      <div className="grid grid-cols-5 gap-x-4 max-w-2xl mx-auto mb-4">
        <SectionTab section={FundraiserSection.Purpose} selectedSection={selectedSection} number={1} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-gray-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Details} selectedSection={selectedSection} number={2} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-gray-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Content} selectedSection={selectedSection} number={3} />
      </div>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl">

        {selectedSection === FundraiserSection.Purpose ?
          <CreatePurpose
            purpose={purpose} setPurpose={setPurpose}
            type={type} setType={setType}
            country={country} setCountry={setCountry}
            dogId={dogId} setDogId={setDogId}
            shelterId={shelterId} setShelterId={setShelterId}
            userId={userId} setUserId={setUserId}
          /> : selectedSection === FundraiserSection.Details ?
            <CreateDetails
              goalAmount={goalAmount}
              setGoalAmount={setGoalAmount}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate} /> :
            <CreateContent
              mainImage={mainImage}
              setMainImage={setMainImage}
              images={images}
              setImages={setImages}
              content={content}
              setContent={setContent}
              title={title}
              setTitle={setTitle}
            />
        }

        <div className="flex justify-end gap-x-4 px-6 py-5 border-t border-gray-300">
          <button
            value={selectedSection}
            onClick={(e: any) => handlePrevClick(e)}
            className="text-gray-500 border border-gray-300 px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-gray-100">
            Back
          </button>
          {selectedSection === FundraiserSection.Content ?
            <button
              value={selectedSection}
              onClick={(e: any) => handleNextClick(e)}
              className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-gray-200 text-gray-500 hover:cursor-disabled"} px-6 py-3 rounded-lg`}
              disabled={!isActive}>
              Save
            </button> :
            <button
              value={selectedSection}
              onClick={(e: any) => handleNextClick(e)}
              className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-gray-200 text-gray-500 hover:cursor-disabled"} px-6 py-3 rounded-lg`}
              disabled={!isActive}>
              Continue
            </button>}
        </div>
      </form>
    </div >

  )
}