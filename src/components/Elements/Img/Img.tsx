import React, { FC, useEffect, useState } from "react";
import styles from "./Img.module.scss";
import { HiCloudArrowUp, HiPhoto } from "react-icons/hi2";

interface ImgProps {
  url: string;
  alt: string;
  formikChange: any;
  setFieldValue: any;
  onFileSelect: (file: File) => void;
}

const Img: FC<ImgProps> = (props) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>();
  const [dragOver, setDragOver] = useState<Boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      props.onFileSelect(e.target.files[0]);
    }
  };


  return (
    <div className={styles.Img}>
      {!uploadedImage ? (
        <div
          className={styles.noImage}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <HiCloudArrowUp />
          <span> Drop files here or click to upload.</span>
          <input type="file" className={styles.uploadImage} onChange={handleFileSelect} />
        </div>
      ) : (
        <div className={styles.image}>
          <img src={uploadedImage as string} alt={props.alt} />
        </div>
      )}
    </div>
  );
};

export default Img;
