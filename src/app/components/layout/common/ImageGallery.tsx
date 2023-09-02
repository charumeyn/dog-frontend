import { Dog } from "@/app/types/dog.interface";
import { useEffect, useMemo, useState } from "react";

type ImageGalleryProps = {
  images: string[];
  mainImage: string;
  isSquare?: boolean;
}

const ImageGallery: React.FunctionComponent<ImageGalleryProps> = ({ images, mainImage, isSquare }) => {

  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-1">
        {images?.map((image, i) => (
          <img key={i} className="aspect-[5/5] object-cover rounded-xl mb-4 hover:cursor-pointer"
            src={image} alt={"image" + i}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className="col-span-7">
        <img className={`${isSquare ? "aspect-[5/5]" : "aspect-[4/3]"} object-cover rounded-xl`}
          src={selectedImage} alt={"image"} />
      </div>
    </div>)
}

export default ImageGallery;