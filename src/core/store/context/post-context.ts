import FileUpload from "core/models/file-upload.model";
import { Post } from "data/app.data";
import React from "react";
// import Dashboard from 'core/models/dashboard.model';

export interface PostContextProps {
  posts: Post[];
  setPosts: any;
  files: FileUpload[];
  setFiles: any;
}

export const PostContext = React.createContext<PostContextProps | null>({
  posts: [],
  setPosts: () => {},
  files: [],
  setFiles: () => {},
});
