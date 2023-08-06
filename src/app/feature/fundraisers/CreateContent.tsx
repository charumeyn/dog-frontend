import S3Uploader from "@/app/components/libraries/S3Uploader";
import "react-datepicker/dist/react-datepicker.css";


type CreateContentProps = {
  mainImage: string;
  setMainImage: (mainImage: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (content: string) => void;
}
const CreateContent: React.FunctionComponent<CreateContentProps> = ({ images, setImages, mainImage, setMainImage, content, setContent, title, setTitle }) => {


  return (
    <div className="px-6 py-6">

      <h3 className="text-neutral-700 mb-2 mt-4">Fundraiser Title</h3>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        className="border border-neutral-300 px-3 py-2 rounded-lg w-full"
      />

      <h3 className="text-neutral-700 mb-2  mt-4">Upload images</h3>
      <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />

      <h3 className="text-neutral-700 mb-2 mt-4">Create content</h3>
      <textarea
        id="content"
        name="content"
        rows={10}
        cols={20}
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
        className="border border-neutral-300 px-3 py-2 rounded-lg w-full"
      />
    </div >
  )
}

export default CreateContent;