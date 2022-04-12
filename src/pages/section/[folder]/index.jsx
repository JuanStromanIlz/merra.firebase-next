import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from "../../../features/foldersSlice";

export default function FolderView() {
  const router = useRouter();
  const { folder } = router.query;
  const dispatch = useDispatch();
  const folders = useSelector(({ folders }) => folders);
  const data = folders[folder];
  const { isLoading, error } = folders;

  useEffect(() => {
    const getFromStorage = async (folder) => {
      try {
        dispatch(getFolder(folder));
      } catch ({ message }) {
        console.error(message);
      }
    };
    getFromStorage(folder);
  }, [dispatch, folder]);

  return (
    <Stack>
      <Heading>carpeta {folder}</Heading>
    </Stack>
  );
}
