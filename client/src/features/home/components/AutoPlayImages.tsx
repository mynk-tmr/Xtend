import { Galleria } from "primereact/galleria";

const images = [
  "https://picsum.photos/800/400/?random=1",
  "https://picsum.photos/800/400/?random=2",
  "https://picsum.photos/800/400/?random=3",
  "https://picsum.photos/800/400/?random=4",
  "https://picsum.photos/800/400/?random=5",
];

export const AutoPlayImages = () => {
  return (
    <section>
      <Galleria
        value={images}
        item={(url: string) => (
          <img
            src={url}
            alt="image"
            className="w-[800px] h-[375px] block rounded-sm"
          />
        )}
        circular
        autoPlay
        showThumbnails={false}
        showIndicators
        transitionInterval={5000}
      />
    </section>
  );
};
