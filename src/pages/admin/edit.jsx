import React from "react";
import { useRouter } from "next/router";
import FolderForm from "../../components/FolderForm";
import Title from "src/components/Title";
import getDoc from "src/actions/getDoc";
import updateDoc from "src/actions/updateDoc";
import useFetch from "src/hooks/useFetch";
import TextLayout from "src/components/TextLayout";

export default function Edit() {
  const router = useRouter();
  const { title } = router.query;
  const { data, loading } = useFetch(() => getDoc(title));

  const onUpdate = async (values) => {
    try {
      await updateDoc(values);
      router.push(`/${values.title}`);
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <TextLayout>
      <Title as={"h1"} size={"4xl"} letterSpacing={"wider"} my={12}>
        {loading ? "loading" : "editar"}
      </Title>
      <FolderForm folder={data} onSubmit={onUpdate} />
    </TextLayout>
  );
}
