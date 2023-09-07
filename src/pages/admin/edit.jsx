import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Heading, Stack } from "@chakra-ui/react";
import createDoc from "../../actions/createDoc";
import { PUBLICACIONES } from "../../services/foldersNames";
import FolderForm from "../../components/FolderForm";
import Title from "src/components/Title";
import PageWrapper from "src/components/PageWrapper";
import getDoc from "src/actions/getDoc";
import updateDoc from "src/actions/updateDoc";
import useFetch from "src/hooks/useFetch";

export default function Edit() {
  const router = useRouter();
  const { title, folder } = router.query;
  const { data, loading } = useFetch(() => getDoc(title, folder));

  const onUpdate = async (values) => {
    try {
      const { category: folder, ...rest } = values;
      if (folder !== PUBLICACIONES) {
        await updateDoc({ ...rest }, folder);
        router.push(`/${folder}/${values.title}`);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <PageWrapper pageTitle="Nueva publicacion">
      <Title as={"h1"} size={"4xl"} letterSpacing={"wider"} my={12}>
        {loading ? "loading" : "editar"}
      </Title>
      <FolderForm folder={data} onSubmit={onUpdate} />
    </PageWrapper>
  );
}
