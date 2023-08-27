"use client"

import { IconCheck } from "@/app/components/layout/Icons";
import Alert from "@/app/components/layout/common/Alert";
import Button from "@/app/components/layout/common/Button";
import Heading from "@/app/components/layout/common/Heading";
import Input, { InputType } from "@/app/components/layout/common/Input";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import { useAccount } from "@/app/hooks/api/useAuth";
import { useFundraiser, useUpdateFundraiser } from "@/app/hooks/api/useFundraisers";
import { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FundraiserEditContent({ id }: { id: number }) {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startsAt, setStartsAt] = useState<Date | null>();
  const [endsAt, setEndsAt] = useState<Date | null>();
  const [content, setContent] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [error, setError] = useState<string[]>([])
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { data: account, isLoading: isLoadingAccount } = useAccount();
  const { data: fundraiser, isLoading: isLoadingFundraiser } = useFundraiser(id);

  const onError = useCallback((error: any) => {
    setError(error.message)
  }, [setError])

  const onSuccess = useCallback(() => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }, [setIsSuccess])

  const currentAmount = useMemo(() => {
    if (fundraiser && fundraiser?.donations.length > 0) {
      return fundraiser?.donations.reduce((total, x) => total + x.amount, 0);
    } else return 0
  }, [fundraiser])

  const { mutate: updateFundraiser, isLoading } = useUpdateFundraiser(onSuccess, onError)

  useEffect(() => {
    if (fundraiser) {
      setTitle(fundraiser.title)
      setDescription(fundraiser.description)
      setStartsAt(new Date(fundraiser.startsAt))
      setEndsAt(new Date(fundraiser.endsAt))
      setContent(fundraiser.content)
      setGoalAmount(Number(fundraiser.goalAmount))
      setImages(fundraiser.images)
      setMainImage(fundraiser.mainImage)
    }
  }, [setTitle, setDescription, setStartsAt, setEndsAt, setContent, setGoalAmount, setImages, setMainImage, fundraiser])

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();

    if (startsAt && endsAt) {
      const body = {
        id,
        title,
        description,
        startsAt,
        endsAt,
        content,
        goalAmount,
        images,
        mainImage,
      }

      updateFundraiser(body)
    }

  }, [title, description, startsAt, endsAt, content, goalAmount, images, mainImage])

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1" text="Edit Fundraiser" />
        <a href="/account/fundraisers/" className="text-gray-500 font-semibold text-sm">Back</a>
      </div>


      {fundraiser ?
        <form onSubmit={onSubmit}>
          <Alert type="error" message={error} setMessage={setError} />

          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg divide-y divide-gray-300 px-8 py-6">
            <div className="grid grid-cols-5 gap-5">
              <div className="col-span-3">
                <Input type={InputType.Text}
                  label={"Title"}
                  name={"title"}
                  value={title}
                  placeholder={"Title"}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <Input type={InputType.Text}
                  name={"Recepient"}
                  label={"Recepient"}
                  disabled
                />
              </div>
              <div className="col-start-1 col-span-1">
                <Input type={InputType.Text}
                  name={"currentAmount"}
                  label={"Current Amount"}
                  value={String(currentAmount)}
                  disabled
                />
              </div>
              <div className="col-span-1">
                <Input type={InputType.Number}
                  label={"Goal Amount"}
                  name={"goalAmount"}
                  value={String(goalAmount)}
                  onChange={(e: any) => setGoalAmount(Number(e.target.value))}
                />
              </div>
              <div className="col-start-1 col-span-1">
                <span className="block text-sm font-medium leading-6 text-zinc-900">Start Date</span>
                <DatePicker
                  selected={startsAt}
                  onChange={(date) => setStartsAt(date)}
                  selectsStart
                  startDate={startsAt}
                  endDate={endsAt}
                  dateFormat="yyyy/MM/dd"
                  className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-1">
                <span className="block text-sm font-medium leading-6 text-zinc-900">End Date</span>
                <DatePicker
                  selected={endsAt}
                  onChange={(date) => setEndsAt(date)}
                  selectsEnd
                  startDate={startsAt}
                  endDate={endsAt}
                  minDate={startsAt}
                  dateFormat="yyyy/MM/dd"
                  className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-5">
                <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Upload images</h3>
                <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
              </div>

              <div className="col-span-4">
                <span className="block text-sm font-medium leading-6 text-zinc-900">Content</span>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  cols={20}
                  value={content}
                  onChange={(e: any) => setContent(e.target.value)}
                  className="mt-2 text-zinc-900 focus:ring-indigo-600 ring-zinc-300 placeholder:text-zinc-400 block w-full rounded-md border-0 px-3 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-5">
                {isSuccess ?
                  <Button type={"submit"} color="green" disabled={true} content={<div><IconCheck className="w-5 h-5 inline-block mr-2" /> Saved!</div>} />
                  :
                  <Button type={"submit"} onClick={(e: any) => onSubmit(e)} content={isLoading ? "Saving..." : "Save"} disabled={isLoading} />
                }
              </div>

            </div>
          </div>
        </form> : null}
    </div>
  )
}
