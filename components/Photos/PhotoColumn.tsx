import type { IPhoto } from "../../models/Photo";
import PhotoItem from "./PhotoItem";

const PhotoColumn = ({
  photos,
  colsTotal,
  colNumber,
  lastElementRef,
}: PhotoColumnProps) => {
  return (
    <div className="flex flex-col gap-2">
      {photos.length > 0 &&
        photos.map((photo, index) => {
          if (index % colsTotal === colNumber - 1) {
            if (photos.length === index + 1)
              return (
                <PhotoItem ref={lastElementRef} key={photo._id} photo={photo} />
              );
            else return <PhotoItem key={photo._id} photo={photo} />;
          } else return;
        })}
    </div>
  );
};

type PhotoColumnProps = {
  photos: IPhoto[];
  colsTotal: number;
  colNumber: number;
  lastElementRef: (node: HTMLDivElement) => void;
};
export default PhotoColumn;
