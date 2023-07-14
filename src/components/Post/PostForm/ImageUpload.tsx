import React, { Component } from "react";

interface ImageUploadProps {
  name: string;
}

interface ImageUploadState {
  count: number;
}

class ImageUpload extends Component<ImageUploadProps, ImageUploadState> {
  public constructor(props: ImageUploadProps) {
    super(props);
  }
}
