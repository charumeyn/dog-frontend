import { Dog } from "@/app/types/dog.interface"
import { Fundraiser } from "@/app/types/fundraiser.interface"

type FundraiserInfoProps = {
  fundraiser: Fundraiser | undefined
}

const DogInfo: React.FunctionComponent<FundraiserInfoProps> = ({ fundraiser }) => {

  return (
    <>
      <h1 className="text-4xl mb-2">{fundraiser?.title}</h1>
      <p className="text-gray-500 mb-8">$100 raiser of $200</p>
      <a href="" className="w-full inline-block text-center mt-5 bg-orange-600 text-white text-md px-6 py-3 rounded-lg font-medium">Donate</a>
      <a href="" className="w-full inline-block text-center mt-5 text-md">Share</a>
      <p className="mt-10 font-medium">Latest donation</p>
      <div className="flex gap-x-5 mt-2 items-center mb-5">
        <img src="https://images.pexels.com/photos/3104709/pexels-photo-3104709.jpeg" className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-sm">insert donor name</p>
          <p className="text-sm text-gray-500">insert donation amount - insert date</p>
        </div>
      </div>
      <a href="" className="text-sm">View list of donors</a>
    </>
  )
}

export default DogInfo;