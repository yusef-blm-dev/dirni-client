import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./avataruploader.css";

export function AvatarUploader({ imageUrl, onFileChange, setFiles }) {
  const [preview, setPreview] = useState(imageUrl);

  const convertFileToUrl = (file) => URL.createObjectURL(file);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
      const previewUrl = convertFileToUrl(acceptedFiles[0]);
      setPreview(previewUrl);
      onFileChange(previewUrl);
    },
    [setFiles, onFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="avatar-container">
        {preview ? (
          <img src={preview} alt="Avatar Preview" className="avatar-preview" />
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
        <div className="tooltip">
          <span className="tooltip-text">
            Click or drag and drop to update avatar
          </span>
        </div>
      </div>
    </div>
  );
}
