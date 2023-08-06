"use client"

import CreateContent from "@/app/feature/fundraisers/CreateContent"
import CreateDetails from "@/app/feature/fundraisers/CreateDetails"
import CreatePurpose from "@/app/feature/fundraisers/CreatePurpose"
import SectionTab from "@/app/feature/fundraisers/SectionTab"
import { useCreateFundraiser } from "@/app/hooks/api/useFundraisers"
import { SuccessResult } from "@/app/types/apiResult"
import { FundraiserSection } from "@/app/types/enum/fundraiserSection.enum"
import { RecipientType } from "@/app/types/enum/recipientType.enum"
import { CreateFundraiserDto, Fundraiser } from "@/app/types/fundraiser.interface"
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from "react"


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
  const [fundraiserId, setFundraiserId] = useState<number | undefined>(undefined);

  const { typeParam } = searchParams;

  useEffect(() => {
    if (fundraiserId) {
      redirect(`/fundraisers/${fundraiserId}`);
    }
  }, [fundraiserId])

  const onCreateSuccess = useCallback((data: SuccessResult<Fundraiser>) => {
    setFundraiserId(Number(data.data.id))
  },
    [setFundraiserId]
  );

  const onCreateError = useCallback(
    (error: any) => {
      console.log("onError", error)
    },
    []
  );

  const { mutate: createFundraiser } = useCreateFundraiser(onCreateSuccess, onCreateError);

  const handleSave = useCallback((e: any) => {
    e.preventDefault();

    if (startDate && endDate) {
      const body: CreateFundraiserDto = {
        title,
        content,
        main_image: mainImage,
        images,
        purpose,
        goal_amount: Number(goalAmount),
        starts_at: startDate,
        ends_at: endDate,
        created_at: new Date(),
        created_by: 1,
        type,
        shelter_id: shelterId ? shelterId : undefined,
        user_id: userId ? userId : undefined,
        dog_id: dogId ? Number(dogId) : undefined,
      }

      console.log(body);
      createFundraiser(body)
    }

  }, [title, content, mainImage, images, purpose, goalAmount, startDate, endDate, shelterId, dogId, userId, createFundraiser])


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
      return purpose !== ''
    } else if (selectedSection === FundraiserSection.Details) {
      return goalAmount !== '' && startDate !== null && endDate !== null
    } else if (selectedSection === FundraiserSection.Content) {
      return mainImage != '' && images.length !== 0 && content !== ''
    }
  }, [selectedSection, purpose, country, goalAmount, startDate, endDate, mainImage, images, content])



  return (
    <div className="bg-neutral-100 py-20">

      <h1 className="text-2xl font-bold max-w-2xl mx-auto mb-4 text-center">Create a Fundraiser</h1>
      <div className="grid grid-cols-5 gap-x-4 max-w-2xl mx-auto mb-4">
        <SectionTab section={FundraiserSection.Purpose} selectedSection={selectedSection} number={1} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-neutral-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Details} selectedSection={selectedSection} number={2} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-neutral-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Content} selectedSection={selectedSection} number={3} />
      </div>

      <form className="max-w-2xl mx-auto bg-white rounded-2xl">

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

        <div className="flex justify-end gap-x-4 px-6 py-5 border-t border-neutral-300">
          <button
            value={selectedSection}
            onClick={(e: any) => handlePrevClick(e)}
            className="text-neutral-500 border border-neutral-300 px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-neutral-100">
            Back
          </button>
          {selectedSection === FundraiserSection.Content ?
            <span
              onClick={(e: any) => handleSave(e)}
              className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-neutral-200 text-neutral-500 hover:cursor-disabled"} px-6 py-3 rounded-lg`}>
              Save
            </span> :
            <button
              value={selectedSection}
              onClick={(e: any) => handleNextClick(e)}
              className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-neutral-200 text-neutral-500 hover:cursor-disabled"} px-6 py-3 rounded-lg`}
              disabled={!isActive}>
              Continue
            </button>}
        </div>
      </form >
    </div >

  )
}