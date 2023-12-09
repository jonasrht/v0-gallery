import { ImageOff } from "lucide-react";
import { FC, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  [propName: string]: unknown;
}

const Image: FC<ImageProps> = ({ src, alt, width, height, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };
  if (error)
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ width, height }}
      >
        <ImageOff className="primary opacity-70" />
      </div>
    );

  return (
    <>
      {loading && <Skeleton style={{ width, height }} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`${loading ? "hidden" : "block"}`}
        {...props}
      />
    </>
  );
};

export default Image;
