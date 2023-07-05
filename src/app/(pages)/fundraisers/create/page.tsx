"use client"

import CreateContent from "@/app/feature/fundraisers/CreateContent"
import CreateDetails from "@/app/feature/fundraisers/CreateDetails"
import CreatePurpose from "@/app/feature/fundraisers/CreatePurpose"
import SectionTab from "@/app/feature/fundraisers/SectionTab"
import { FundraiserSection } from "@/app/types/enum/fundraiserSection.enum"
import { RecipientType } from "@/app/types/enum/recipientType.enum"
import { CreateFundraiserDto } from "@/app/types/fundraiser.interface"
import { RadioGroup } from "@headlessui/react"
import { S3 } from "aws-sdk"
import { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useState } from "react"


export default function CreateFundRaiser({ searchParams }: { searchParams: any }) {

  const { typeParam } = searchParams;

  const onSubmit = useCallback(() => {


  }, [])

  const [selectedSection, setSelectedSection] = useState<FundraiserSection>(FundraiserSection.Purpose)
  const [type, setType] = useState<RecipientType>(RecipientType.Dog);
  const [purpose, setPurpose] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [closeGoalReached, setCloseGoalReached] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

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

  const s3 = new S3({
    accessKeyId: 'AKIAZQXK5AB4ADKPJKXG',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });

  // const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [params, setParams] = useState<any>()

  useEffect(() => {
    return upload?.abort();
  }, []);

  useEffect(() => {
    // progress.set(0);
    setUpload(null);
  }, [params]);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    console.log(e.target.files)

    let array = []
    let files = e.target.files!;

    for (var i = 0, l = files.length; i < l && l; i++) {
      array.push({
        Bucket: 'doggoslife',
        Key: files.item(i)?.name,
        Body: files.item(i),
        ContentType: files.item(i)?.type,
      })

      console.log(files.item(i)?.type)
    }

    setParams(array as any)
  };

  const handleUpload: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!params) return;

    // const params = [{
    //   Bucket: 'doggoslife',
    //   Key: files[0].name,
    //   Body: files[0],
    // }, {
    //   Bucket: 'doggoslife',
    //   Key: files[1].name,
    //   Body: files[1],
    // }];

    for (var i = 0, l = params.length; i < l && l; i++) {
      try {
        const upload = s3.upload(params[i]);
        setUpload(upload);
        upload.on('httpUploadProgress', (p) => {
          console.log(" p.loaded", p.loaded);
          console.log("p.total", p.total)
          console.log("p", p)
        });
        await upload.promise();
        console.log(`File uploaded successfully: ${params[i].name}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!upload) return;
    upload.abort();
    // progress.set(0);
    setUpload(null);
  };

  return (
    <div className="bg-gray-100 py-20">

      <div className="dark flex min-h-screen w-full items-center justify-center">
        <main>
          <form className="flex flex-col gap-4 rounded bg-stone-800 p-10 text-white shadow">
            <input type="file" onChange={handleFileChange} multiple />
            <button
              className="rounded bg-green-500 p-2 shadow"
              onClick={handleUpload}>
              Upload
            </button>
            {upload && (
              <>
                <button
                  className="rounded bg-red-500 p-2 shadow"
                  onClick={handleCancel}>
                  Cancel
                </button>
                {/* {JSON.stringify(progress)} */}
                {/* <ProgressBar value={progress} /> */}
              </>
            )}
          </form>
        </main>
      </div>

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
          /> : selectedSection === FundraiserSection.Details ?
            <CreateDetails
              goalAmount={goalAmount}
              setGoalAmount={setGoalAmount}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              closeGoalReached={closeGoalReached}
              setCloseGoalReached={setCloseGoalReached} /> :
            <CreateContent
              mainImage={mainImage}
              setMainImage={setMainImage}
              images={images}
              setImages={setImages}
              content={content}
              setContent={setContent}
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
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-teal-700">
              Save
            </button> :
            <button
              value={selectedSection}
              onClick={(e: any) => handleNextClick(e)}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:cursor-pointer hover:bg-teal-700">
              Continue
            </button>}
        </div>
      </form>
    </div >

  )
}