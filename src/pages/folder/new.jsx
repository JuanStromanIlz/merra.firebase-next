import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import { createItem } from "../../actions/createItem";
import { PUBLICACIONES } from "../../services/foldersNames";
import FolderForm from "../../components/FolderForm";

export default function NewFolder() {
  const onSubmit = (values) => {
    const { folder, ...rest } = values;
    console.log(folder);
  };

  return (
    <Stack>
      <Heading>Nueva carpeta</Heading>
      <FolderForm onSubmit={onSubmit} />
    </Stack>
  );
}
