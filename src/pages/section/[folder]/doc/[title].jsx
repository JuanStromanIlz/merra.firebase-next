import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../../../services/foldersNames";
import getSection from "../../../../actions/getSection";
import getDoc from "../../../../actions/getDoc";

const TitleView = ({ doc }) => {
  useEffect(() => {
    console.log(doc);
  }, [doc]);

  return (
    <Stack>
      <Heading>carpeta</Heading>
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

export default TitleView;
