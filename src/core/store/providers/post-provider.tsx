import React from "react";
import { PostContext } from "../context/post-context";
import { Post, post_default_data } from "data/app.data";
import FileUpload from "core/models/file-upload.model";
import { useForm } from "react-hook-form";

export default function PostProvider({ children }: any) {
  const [posts, setPosts] = React.useState<Post[]>([...post_default_data]);
  const [files, setFiles] = React.useState<FileUpload[]>([]);

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      body: "",
      category: null,
    },
  });

  const contextValue = {
    posts,
    setPosts,
    files,
    setFiles,
    control,
    isValid,
    handleSubmit,
    reset,
    setValue,
    watch,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
