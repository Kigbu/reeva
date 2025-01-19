import React from "react";
import { L } from "core/utils/helpers";
import { PostContext } from "core/store/context/post-context";

export default function usePost() {
  const {
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
  }: any = React.useContext(PostContext);

  return {
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
}
