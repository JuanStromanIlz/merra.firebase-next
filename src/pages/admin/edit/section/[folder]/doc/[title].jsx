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
      <Heading>
        edit folder: {folder} title: {title}
      </Heading>
      {Object.keys(data).length !== 0 && (
        <FolderForm isSubmit={isLoading} folder={data} onSubmit={onSubmit} />
      )}
    </Stack>
  );
};

export async function getStaticProps({ params }) {
  const { section, title } = params;
  const doc = await getDoc(title, section);
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
        docs.push({ section: section, title: doc.title });
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
