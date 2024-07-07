import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageItem {
  id: string;
  urls: {
    small: string;
  };
  slug: string;
}

interface ImageGalleryProps  {
  items: ImageItem[];
  onImageClick: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => (
  <ul className={css["image-gallery"]}>
    {items.map(({ id, urls, slug }) => (
      <li key={id}>
        <ImageCard
          
          imgUrl={urls.small}
          imgDescr={slug}
          onClick={() => onImageClick(urls.small)}
        />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
