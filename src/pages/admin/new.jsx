import React from "react";
import { useRouter } from "next/router";
import { Heading, Stack } from "@chakra-ui/react";
import createDoc from "../../actions/createDoc";
import { PUBLICACIONES } from "../../services/foldersNames";
import FolderForm from "../../components/FolderForm";
import Title from "src/components/Title";
import PageWrapper from "src/components/PageWrapper";

export default function NewItem() {
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const { category: folder, ...rest } = values;
      if (folder !== PUBLICACIONES) {
        await createDoc({ ...rest }, folder);
        router.push(`/section/${folder}/doc/${values.title}`);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <PageWrapper pageTitle="Nueva publicacion">
      <Title as={"h1"} size={"4xl"} letterSpacing={"wider"} my={12}>
        Nueva publicacion
      </Title>
      <FolderForm onSubmit={onSubmit} />
    </PageWrapper>
  );
}
