import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from "../../../../features/foldersSlice";
import { getDetail } from "../../../../features/detailSlice";

const TitleView = () => {
  const router = useRouter();
  const { folder, title } = router.query;
  const dispatch = useDispatch();
  // Title info
  const { isLoading, error, data } = useSelector(({ detail }) => detail);
  // Folder info
  const folders = useSelector(({ folders }) => folders);
  const folderData = folders[folder];
  const { isLoading: folderIsLoading, error: folderError } = folders;

  useEffect(() => {
    dispatch(getFolder(folder));
    dispatch(getDetail({ title, folder }));
  }, [dispatch, title, folder]);

  return (
    <Stack>
      <Heading>
        carpeta: {folder}, titulo: {title}
      </Heading>
    </Stack>
  );
};

export default TitleView;
