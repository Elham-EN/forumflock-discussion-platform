import React, { Component, ReactElement, useState } from "react";
import { FilePond, registerPlugin } from "filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// Import the plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImagePreview);

export default function ImageUpload() {
  const [files, setFiles] = useState([]);
  return <div className="App">{/* <FilePond files={files} /> */}</div>;
}
