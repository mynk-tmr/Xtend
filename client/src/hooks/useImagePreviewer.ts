import { useCallback, useState } from "react";

type Image = {
  name: string;
  size: number;
  url: string;
};

export default function () {
  const [images, setImages] = useState<Image[]>([]);
  const changeImages = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files) return;
      setImages([]);
      for (const file of ev.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file); //start async reading
        reader.onload = () =>
          setImages((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              url: reader.result as string,
            },
          ]);
      }
    },
    []
  );
  return { images, changeImages };
}
