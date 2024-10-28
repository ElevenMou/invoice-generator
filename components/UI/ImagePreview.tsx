import Image from "next/image";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Loading from "./Loading";

interface ImagePreviewProps {
  file?: File;
  fileUrl?: string; // New prop for accepting an image URL
  setFile: (file: File | undefined) => void;
  label?: string;
  className?: string;
  containerClassName?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  fileUrl, // Destructure fileUrl
  setFile,
  className,
  containerClassName,
  label,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setLoading(true);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
        setError(null);
      } else {
        setError("File is not an image.");
        setImageSrc(null);
      }
      setLoading(false);
    } else if (fileUrl) {
      // Set the image source to the provided URL
      setImageSrc(fileUrl);
    }
  }, [file, fileUrl]);

  return (
    <div className={twMerge(containerClassName ? containerClassName : "")}>
      <label className="mb-1 flex text-sm font-medium text-text justify-between w-full">
        <span>{label}</span>
        {(file || fileUrl) && (
          <button
            className="text-primary text-sm font-medium"
            onClick={() => {
              setFile(undefined);
              setImageSrc(null);
            }}
          >
            Clear
          </button>
        )}
      </label>
      <div
        className={twMerge(
          "relative border border-dashed border-text text-center w-full aspect-video",
          className ? className : ""
        )}
      >
        {loading ? (
          <Loading />
        ) : (
          <label
            className={twMerge(
              "absolute inset-0 flex items-center justify-center p-2",
              imageSrc
                ? "bg-slate-950 bg-opacity-30 opacity-0 hover:opacity-100 transition-all duration-300 text-white"
                : ""
            )}
          >
            <span>Drag an image or click to select</span>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 z-20 opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </label>
        )}
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Preview"
            height={200}
            width={200}
            className="w-full h-full object-cover"
          />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ImagePreview;
