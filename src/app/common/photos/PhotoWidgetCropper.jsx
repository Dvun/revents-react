import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const PhotoWidgetCropper = ({setImage, imagePreview}) => {
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob(blob => setImage(blob), 'image/jpeg')
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview='.img-preview'
      viewMode={1}
      guides={false}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};