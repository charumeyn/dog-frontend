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
const CreateContent: React.FunctionComponent<CreateContentProps> = ({ mainImage, setMainImage, images, setImages, content, setContent }) => {
  return (
    <div className="px-6 py-6">
      <h3 className="text-gray-700 mb-2">Upload main image</h3>
      <div className="grid grid-cols-3 gap-x-2">
        <input
          id="mainImage"
          type="text"
          name="mainImage"
          value={mainImage}
          onChange={(e: any) => setMainImage(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

      <h3 className="text-gray-700 mb-2">Upload more images</h3>
      <div className="grid grid-cols-3 gap-x-2">
        <input
          id="images"
          type="text"
          name="images"
          value={images}
          onChange={(e: any) => setImages(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

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