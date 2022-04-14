import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import FolderForm from "../../../../../../components/FolderForm";
import updateDoc from "../../../../../../actions/updateDoc";
import getSection from "../../../../../../actions/getSection";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../../../../../services/foldersNames";
import getDoc from "../../../../../../actions/getDoc";

const EditFolderView = ({ doc }) => {
  const onSubmit = async (values) => {
    try {
      const { category: folderValue, ...rest } = values;
      if (folderValue !== PUBLICACIONES) {
        await updateDoc({ ...rest }, folderValue);
        router.push(`/section/${folderValue}/doc/${values.title}`);
      }
    } catch ({ message }) {
      console.error(message);
    }
  };

  useEffect(() => {
    console.log(doc);
  }, [doc]);

  return (
    <Stack>
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
      doc,
    },
    revalidate: 5,
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

export default EditFolderView;
