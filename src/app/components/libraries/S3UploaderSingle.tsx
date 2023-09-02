import { ChangeEventHandler, useCallback, useState } from "react";
import { IconClose, IconPlus } from "../layout/Icons"
import S3, { PutObjectRequest } from "aws-sdk/clients/s3";

type S3UploaderSingleProps = {
  images: string[];
  setImages: (image: string[]) => void;
}

const S3UploaderSingle: React.FunctionComponent<S3UploaderSingleProps> = ({ images, setImages }) => {

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
    }
  }, [setImages, images])

  return (
    <>
      <div className="grid grid-cols-5 gap-x-3">
        {images?.map((image: string, i: number) =>
          <div key={i} className="hover:cursor-pointer col-span-1 relative mb-3">
            <span onClick={() => handleRemoveImage(image)}>
              <IconClose className="w-6 h-6 text-white absolute right-2 top-2 hover:cursor-pointer" />
            </span>
            <img className="aspect-[5/5] object-cover" src={image} alt={"image " + i} />
          </div>
        )}
      </div>

      {images.length > 0 ? null :
        <div>
          {isLoading ? "loading" :
            <div className="flex justify-center items-center gap-x-2 text-teal-600 font-medium bg-teal-600 bg-opacity-10 border border-teal-600 border-opacity-200 px-5 py-3 w-48 text-sm hover:cursor-pointer rounded-lg">
              <IconPlus className="w-5 h-5" />
              <label htmlFor="files">Upload Image</label>
              <input id="files" className="hidden" type="file" onChange={handleUpload} multiple></input>
            </div>
          }
        </div>}
    </>
  )
}

export default S3UploaderSingle;