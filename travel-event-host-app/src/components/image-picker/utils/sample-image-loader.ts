import React from 'react';

export const SampleImageLoader = {
  load: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormValuesFunction: React.Dispatch<React.SetStateAction<any>>,
    setImagePreviewFunction: React.Dispatch<React.SetStateAction<any>>,
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('image')) {
        console.error('File is not an image');
        return;
      }
      setFormValuesFunction((prev: any) => ({
        ...prev,
        imageFile: file,
      }));

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImagePreviewFunction(e.target?.result);
      };

      fileReader.readAsDataURL(file);
    }
  },
};
