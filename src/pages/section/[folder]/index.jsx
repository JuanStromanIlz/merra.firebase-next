import React, { useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/react";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../../services/foldersNames";
import getSection from "../../../actions/getSection";

const SectionView = ({ folder }) => {
  useEffect(() => {
    console.log(folder);
  }, [folder]);

  return (
    <Stack>
      <Heading>carpeta</Heading>
    </Stack>
  );
};

export async function getStaticProps({ params }) {
  const folder = await getSection(params.folder);
  return {
    props: {
      folder,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const sections = [EDITORIAL, ARTWORK, COMERCIAL, FILMS, BLOG, PUBLICACIONES];
  // Get the paths we want to pre-render based on sections
  const paths = sections.map((folder) => ({
    params: { folder: folder },
  }));

  return { paths, fallback: false };
}

export default SectionView;
