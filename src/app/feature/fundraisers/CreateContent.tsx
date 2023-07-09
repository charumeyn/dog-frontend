import S3Uploader from "@/app/components/libraries/S3Uploader";
import { RecipientType } from "@/app/types/enum/recipientType.enum";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type CreateContentProps = {
  mainImage: string;
  setMainImage: (mainImage: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  content: string;
  setContent: (content: string) => void;
}
const CreateContent: React.FunctionComponent<CreateContentProps> = ({ images, setImages, mainImage, setMainImage, content, setContent }) => {


  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Upload main image</h3>

      <h3 className="text-gray-700 mb-2">Upload more images</h3>
      <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />

      <h3 className="text-gray-700 mb-2">Create content</h3>
      <div className="grid grid-cols-3 gap-x-2">
        <input
          id="content"
          type="text"
          name="content"
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

    </div >
  )
}

export default CreateContent;