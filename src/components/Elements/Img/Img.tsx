import React, { FC,  useEffect, useState } from "react";
import styles from "./Img.module.scss";
import { HiPhoto } from "react-icons/hi2";

interface ImgProps {
  url: string;
  alt: string;
  formikChange: any;
  setFieldValue: any
}

const Img: FC<ImgProps> = (props) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>();

  const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        props.setFieldValue(`imageUrl`,e.target?.result)
      };
      reader.readAsDataURL(files[0]);
    }
  };


  return (
    <div className={styles.Img}>
      {!uploadedImage ? (
        <div className={styles.noImage}>
          <HiPhoto />
          <input type="file" className={styles.uploadImage} onChange={handleUploads} />
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
