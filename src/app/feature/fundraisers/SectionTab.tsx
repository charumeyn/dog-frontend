import { FundraiserSection } from "@/app/types/enum/fundraiserSection.enum"

type SectionTabProps = {
  selectedSection: FundraiserSection;
  section: FundraiserSection;
  number: number;
}
const SectionTab: React.FunctionComponent<SectionTabProps> = ({ selectedSection, section, number }) => {
  return (
    <div className="flex gap-x-2 items-center">
      <span className={`${selectedSection === section ? 'bg-teal-600' : 'bg-zinc-300'} hidden md:flex items-center justify-center text-white font-medium rounded-full w-8 h-8`}>
        {number}
      </span>
      <h2 className={`${selectedSection === section ? 'text-teal-600' : 'text-zinc-400'} font-medium text-sm md:text-base`}>{section}</h2>
    </div>
  )
}

export default SectionTab;