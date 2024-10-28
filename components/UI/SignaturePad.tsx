"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "./Button";
import Image from "next/image";

const SignaturePad = ({
  initialSignature,
  onChange,
}: {
  initialSignature?: string;
  onChange: (signature: File | undefined) => void;
}) => {
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const [signature, setSignature] = useState<string | undefined>(
    initialSignature
  );

  const clearSignature = () => {
    signatureCanvasRef.current?.clear();
    setSignature(undefined);
    onChange(undefined);
  };

  const handleEnd = () => {
    if (signatureCanvasRef.current?.isEmpty()) return;
    const signatureImage = signatureCanvasRef.current?.toDataURL();
    if (signatureImage) {
      setSignature(signatureImage);
      const signatureFile = dataURLtoFile(signatureImage, "signature.png");
      onChange(signatureFile);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime ?? "image/png" });
  };

  useEffect(() => {
    setSignature(initialSignature);
  }, [initialSignature]);

  return (
    <div className="col-span-full flex flex-col">
      <div className="w-fit">
        <label className="block text-sm font-medium text-text mb-2">
          Signature
        </label>
        {signature ? (
          <Image src={signature} alt="signature" width={300} height={200} />
        ) : (
          <SignatureCanvas
            ref={signatureCanvasRef}
            penColor="#5358e4"
            onEnd={handleEnd}
            canvasProps={{
              width: 300,
              height: 200,
              className: "signature-canvas",
              style: {
                border: "1px solid #ccc",
              },
            }}
          />
        )}
        <div className="flex gap-4 mt-1 justify-end">
          <Button type="button" variant="link" onClick={clearSignature}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
