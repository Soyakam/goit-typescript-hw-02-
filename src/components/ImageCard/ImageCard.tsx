import React from "react";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  imgUrl: string;
  imgDescr: string;
  onClick: (imgUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imgUrl, imgDescr, onClick }) => {
  const handleClick = () => {
    onClick(imgUrl);
  };

  return (
    <div className={css["image-card"]} onClick={handleClick}>
      <img src={imgUrl} alt={imgDescr} />
    </div>
  );
};

export default ImageCard;
