import { Flex } from "@chakra-ui/react";
import React from "react";
import getRelatedDocs from "src/actions/getRelatedDocs";
import useFetch from "src/hooks/useFetch";

const RelatedPosts = ({ doc }) => {
  const { data, loading } = useFetch(() => getRelatedDocs(doc));
  return <Flex></Flex>;
};
