import { useAccount } from "@/app/hooks/api/useAuth";
import { useCreateFundraiser } from "@/app/hooks/api/useFundraisers";
import { SuccessResult } from "@/app/types/apiResult";
import { FundraiserSection } from "@/app/types/enum/fundraiserSection.enum";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import { CreateFundraiserDto, Fundraiser } from "@/app/types/fundraiser.interface";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import SectionTab from "./SectionTab";
import CreatePurpose from "./CreatePurpose";
import CreateDetails from "./CreateDetails";
import CreateContent from "./CreateContent";
import Alert from "@/app/components/layout/common/Alert";

export default function FundraiserCreateContent({ searchParams }: { searchParams: any }) {

  const [selectedSection, setSelectedSection] = useState<FundraiserSection>(FundraiserSection.Purpose);
  const [type, setType] = useState<RecipientType>(RecipientType.Dog);
  const [dogId, setDogId] = useState<number | undefined>(undefined);
  const [shelterId, setShelterId] = useState<number | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [fundraiserId, setFundraiserId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string[]>([])

  const { data: account } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      if (searchParams.type === RecipientType.Dog) {
        setType(RecipientType.Dog)
      } else if (searchParams.type === RecipientType.Shelter) {
        setType(RecipientType.Shelter)
      } else {
        setType(RecipientType.User)
      }
    }
  }, [setType, searchParams])

  useEffect(() => {
    if (account) {
      if (account.id === undefined) {
        router.push("/login")
      }
    }
  }, [account])

  useEffect(() => {
    if (fundraiserId) {
      redirect(`/fundraisers/${fundraiserId}`);
    }
  }, [fundraiserId])

  const onSuccess = useCallback((data: SuccessResult<Fundraiser>) => {
    setFundraiserId(Number(data.data.id))
  },
    [setFundraiserId]
  );

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const { mutate: createFundraiser } = useCreateFundraiser(onSuccess, onError);

  const handleSave = useCallback((e: any) => {
    e.preventDefault();

    if (startDate && endDate && account) {
      const body: CreateFundraiserDto = {
        title,
        description,
        content,
        mainImage,
        images,
        goalAmount: Number(goalAmount),
        startsAt: startDate,
        endsAt: endDate,
        createdById: account?.id,
        type,
        shelterId: shelterId ? shelterId : undefined,
        userId: userId ? userId : undefined,
        dogId: dogId ? Number(dogId) : undefined,
      }

      console.log(body)
      createFundraiser(body)
    }

  }, [account, title, content, mainImage, images, goalAmount, startDate, endDate, shelterId, dogId, userId, createFundraiser])


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
    const ids = [userId, shelterId, dogId]

    if (selectedSection === FundraiserSection.Purpose) {
      return ids.some((v) => v != undefined)
    } else if (selectedSection === FundraiserSection.Details) {
      return goalAmount !== '' && startDate !== null && endDate !== null
    } else if (selectedSection === FundraiserSection.Content) {
      return mainImage != '' && images.length !== 0 && content !== ''
    }
  }, [selectedSection, goalAmount, startDate, endDate, mainImage, images, content, userId, shelterId, dogId])


  return (
    <div className="bg-zinc-100 py-20">
      <h1 className="text-xl md:text-2xl font-bold max-w-2xl mx-auto mb-4 text-center">Create a Fundraiser</h1>
      <div className="grid grid-cols-5 gap-x-2 md:gap-x-4 max-w-2xl mx-auto mb-4">
        <SectionTab section={FundraiserSection.Purpose} selectedSection={selectedSection} number={1} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-zinc-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Details} selectedSection={selectedSection} number={2} />
        <div className="flex gap-x-2 items-center">
          <div className="h-0.5 w-full bg-zinc-300"></div>
        </div>
        <SectionTab section={FundraiserSection.Content} selectedSection={selectedSection} number={3} />
      </div>

      {account ?
        <form className="max-w-2xl mx-auto bg-white rounded-2xl">
          <>
            <Alert type="error" message={error} setMessage={setError} />
            {selectedSection === FundraiserSection.Purpose ?
              <CreatePurpose
                account={account}
                type={type} setType={setType}
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
                  description={description}
                  setDescription={setDescription}
                  content={content}
                  setContent={setContent}
                  title={title}
                  setTitle={setTitle}
                />
            }
          </>

          <div className="flex justify-end gap-x-3 md:gap-x-4 px-6 py-5 border-t border-zinc-300">
            <button
              value={selectedSection}
              onClick={(e: any) => handlePrevClick(e)}
              className="text-zinc-500 border border-zinc-300 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg hover:cursor-pointer hover:bg-zinc-100">
              Back
            </button>
            {selectedSection === FundraiserSection.Content ?
              <span
                onClick={(e: any) => handleSave(e)}
                className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-zinc-200 text-zinc-500 hover:cursor-disabled"} text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg`}>
                Save
              </span> :
              <button
                value={selectedSection}
                onClick={(e: any) => handleNextClick(e)}
                className={`${isActive ? "bg-teal-600 hover:bg-teal-700 text-white hover:cursor-pointer" : "bg-zinc-200 text-zinc-500 hover:cursor-disabled"} text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg`}
                disabled={!isActive}>
                Continue
              </button>}
          </div>
        </form > : null}
    </div >
  )
}