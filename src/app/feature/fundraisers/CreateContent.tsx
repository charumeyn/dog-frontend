import Input, { InputType } from "@/app/components/layout/common/Input";
import S3Uploader from "@/app/components/libraries/S3Uploader";
import "react-datepicker/dist/react-datepicker.css";


type CreateContentProps = {
  mainImage: string;
  setMainImage: (mainImage: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  description: string;
  setDescription: (description: string) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (content: string) => void;
}
const CreateContent: React.FunctionComponent<CreateContentProps> = ({ images, setImages, mainImage, setMainImage, description, setDescription, content, setContent, title, setTitle }) => {


  return (
    <div className="px-6 py-6 grid grid-cols-1 gap-4">
      <Input
        type={InputType.Text}
        name={"title"}
        placeholder="Enter fundraiser title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        type={InputType.Text}
        name={"description"}
        placeholder="Enter short description"
        label="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Upload images</h3>
        <S3Uploader images={images} setImages={setImages} mainImage={mainImage} setMainImage={setMainImage} />
      </div>

      <div>
        <h3 className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Content</h3>
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
    </div>
  )
}

export default CreateContent;