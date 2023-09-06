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

export default function Edit() {
  const router = useRouter();
  const { title, folder } = router.query;
  const [doc, setDoc] = useState(undefined);

  useEffect(() => {
    getDoc(title, folder).then((doc) => {
      setDoc({ ...doc, category: folder });
    });
  }, [title, folder]);

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
        Editar
      </Title>
      <FolderForm folder={doc} onSubmit={onUpdate} />
    </PageWrapper>
  );
}
