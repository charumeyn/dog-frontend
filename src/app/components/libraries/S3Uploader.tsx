import { ChangeEventHandler, useCallback, useState } from "react";
import { IconClose, IconPlus } from "../layout/Icons"
import S3, { PutObjectRequest } from "aws-sdk/clients/s3";

type S3UploaderProps = {
  images: string[];
  setImages: (images: string[]) => void;
  mainImage: string;
  setMainImage: (image: string) => void;
  isMultiple?: boolean
}

const S3Uploader: React.FunctionComponent<S3UploaderProps> = ({ images, setImages, setMainImage, mainImage, isMultiple }) => {


  const s3 = new S3({
    accessKeyId: 'AKIAZQXK5AB4ADKPJKXG',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    let files = e.target.files!;

    for (let i = 0; i < files.length; i++) {
      try {
        const upload = s3.upload({
          Bucket: 'doggoslife',
          Key: files.item(i)?.name,
          Body: files.item(i),
          ContentType: files.item(i)?.type,
        } as PutObjectRequest);
        setIsLoading(true);
        await upload.promise().then((data) => images.push(data.Location));
      } catch (err) {
        console.error(err);
      }
    }
    setIsLoading(false);
  };

  const handleRemoveImage = useCallback((image: string) => {
    const list = [...images]

    if (list.indexOf(image) >= 0) {
      const filtered = list.filter(x => x !== image)
      setImages(filtered)
      setMainImage("")
    }
  }, [setImages, images])

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-3">
        {images?.map((image: string, i: number) =>
          <div key={i} className={`${image == mainImage ? "border-2 border-teal-600 " : "border-2 border-white "} hover:cursor-pointer col-span-1 relative mb-3`}
            onClick={() => setMainImage(image)}>
            {image == mainImage ?
              <span className="bg-teal-600 text-white px-1.5 pt-0.5 pb-1 absolute left-0 top-0 text-xs">Main Image</span>
              : null}
            <span onClick={() => handleRemoveImage(image)}>
              <IconClose className="w-6 h-6 text-white absolute right-2 top-2 hover:cursor-pointer" />
            </span>
            <img className="aspect-[5/5] object-cover" src={image} alt={"image " + i} />
          </div>
        )}
      </div>

      <div>
        {isLoading ? "loading" :
          <div className="flex justify-center items-center gap-x-2 text-teal-600 font-medium bg-teal-600 bg-opacity-10 border border-teal-600 border-opacity-200 px-5 py-3 w-48 text-sm hover:cursor-pointer rounded-lg">
            <IconPlus className="w-5 h-5" />
            <label htmlFor="files">Upload Images</label>
            <input id="files" className="hidden" type="file" onChange={handleUpload} multiple></input>
          </div>
        }
      </div>
    </>
  )
}

export default S3Uploader;