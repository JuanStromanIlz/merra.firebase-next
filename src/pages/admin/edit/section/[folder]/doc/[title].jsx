import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Heading, Stack } from "@chakra-ui/react";
import FolderForm from "../../../../../../components/FolderForm";
import updateDoc from "../../../../../../actions/updateDoc";
import getSection from "../../../../../../actions/getSection";
import deleteDoc from "../../../../../../actions/deleteDoc";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../../../../../services/foldersNames";
import getDoc from "../../../../../../actions/getDoc";

const EditTitleView = ({ doc }) => {
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const { category: folder, ...rest } = values;
      if (folder !== PUBLICACIONES) {
        await updateDoc({ ...rest }, folder);
        router.push(`/section/${folder}/doc/${values.title}`);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  const onDeleteTitle = async (document) => {
    try {
      await deleteDoc(document);
    } catch ({ message }) {
      console.error(message);
    }
  };

  useEffect(() => {
    console.log(doc);
  }, [doc]);

  return (
    <Stack>
      <Button onClick={() => onDeleteTitle(doc)}>delete</Button>
      <Heading>edit folder</Heading>
      {Object.keys(doc).length !== 0 && (
        <FolderForm folder={doc} onSubmit={onSubmit} />
      )}
    </Stack>
  );
};

export async function getStaticProps({ params }) {
  const { folder, title } = params;
  const doc = await getDoc(title, folder);
  return {
    props: {
      doc: { category: folder, ...doc },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sections = [EDITORIAL, ARTWORK, COMERCIAL, FILMS, BLOG, PUBLICACIONES];
  const paths = [];
  const docs = [];
  await Promise.all(
    sections.map(async (section) => {
      let data = await getSection(section);
      data.map((doc) => {
        docs.push({ folder: section, title: doc.title });
      });
    })
  );
  docs.map((doc) => {
    paths.push({ params: { ...doc } });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default EditTitleView;
