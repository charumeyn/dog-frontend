import { Dog } from "@/app/types/dog.interface";
import { useEffect, useMemo, useState } from "react";

type ImageGalleryProps = {
  images: string[];
  mainImage: string;
  isSquare?: boolean;
  isHorizontal?: boolean;
}

const ImageGallery: React.FunctionComponent<ImageGalleryProps> = ({ images, mainImage, isSquare, isHorizontal }) => {

  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  return (
    <div className={`${isHorizontal ? "flex flex-col-reverse" : "grid grid-cols-8 gap-2 md:gap-4"}`}>
      <div className={`${isHorizontal ? "grid grid-cols-8 gap-2 md:gap-4 mt-4" : "col-span-1"}`}>
        {images?.map((image, i) => (
          <img key={i} className={`${isHorizontal ? "" : "mb-2 md:mb-4"} aspect-[5/5] object-cover rounded-xl hover:cursor-pointer`}
            src={image} alt={"image" + i}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className={`${isHorizontal ? "" : "col-span-7"}`}>
        <img className={`${isSquare ? "aspect-[4/3] md:aspect-[5/5]" : "aspect-[4/3]"} object-cover rounded-xl`}
          src={selectedImage} alt={"image"} />
      </div>
    </div>
  )
}

export default ImageGallery;