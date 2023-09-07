import React from "react";
import { useRouter } from "next/router";
import { Heading, Stack } from "@chakra-ui/react";
import createDoc from "../../actions/createDoc";
import FolderForm from "../../components/FolderForm";
import Title from "src/components/Title";
import TextLayout from "src/components/TextLayout";

export default function NewItem() {
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      await createDoc(values);
      router.push(`/${values.title}`);
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <TextLayout>
      <Title as={"h1"} size={"4xl"} letterSpacing={"wider"} my={12}>
        Nueva publicacion
      </Title>
      <FolderForm onSubmit={onSubmit} />
    </TextLayout>
  );
}
