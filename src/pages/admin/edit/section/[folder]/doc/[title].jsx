import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../../../../../features/detailSlice";
import FolderForm from "../../../../../../components/FolderForm";
import { updateItem } from "../../../../../../actions/updateItem";
import { PUBLICACIONES } from "../../../../../../services/foldersNames";

export default function FolderView() {
  const router = useRouter();
  const { folder, title } = router.query;
  const dispatch = useDispatch();
  const { isLoading, error, data = {} } = useSelector(({ detail }) => detail);

  const onSubmit = async (values) => {
    try {
      const { category: folderValue, ...rest } = values;
      if (folderValue !== PUBLICACIONES) {
        await updateItem({ ...rest }, folderValue);
        router.push(`/section/${folderValue}/doc/${values.title}`);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  useEffect(() => {
    dispatch(getDetail({ title, folder }));
  }, [dispatch, title, folder]);

  return (
    <Stack>
      <Heading>
        edit folder: {folder} title: {title}
      </Heading>
      {Object.keys(data).length !== 0 && (
        <FolderForm isSubmit={isLoading} folder={data} onSubmit={onSubmit} />
      )}
    </Stack>
  );
}
