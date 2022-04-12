import React from "react";
import { useRouter } from "next/router";
import { Heading, Stack } from "@chakra-ui/react";
import { createItem } from "../../actions/createItem";
import { PUBLICACIONES } from "../../services/foldersNames";
import FolderForm from "../../components/FolderForm";

export default function NewItem() {
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const { category: folder, ...rest } = values;
      if (folder !== PUBLICACIONES) {
        await createItem({ ...rest }, folder);
        router.push(values.title);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <Stack>
      <Heading>Nueva carpeta</Heading>
      <FolderForm onSubmit={onSubmit} />
    </Stack>
  );
}
