import React, { ChangeEvent, useState } from "react";

export default function useSelectFile() {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    // Access the file user selected 1 Read data from the file and
    //process it to a form that is going be useful
    const reader = new FileReader();
    // First check if there is a valid file selected
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    // Once the reader complete processing the file and take the result
    // and store into the state. Onload is trigger reading data is complete
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
  };
}
