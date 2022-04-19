import React, { useContext } from "react";
import { Box, Flex, Link as ChakraLink, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Admin } from "../contexts/AdminContext";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../services/foldersNames";

const NavTag = ({ children, href, ...props }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href} passHref>
      <ChakraLink
        borderRadius={"md"}
        display={"flex"}
        px={2}
        py={1}
        _hover={{
          textDecoration: "none",
          color: "red.500",
        }}
        _focus={{
          boxShadow: "none",
        }}
        color={asPath.includes(href) && "red.500"}
        borderWidth={asPath.includes(href) && 0.5}
        borderColor={asPath.includes(href) && "red.500"}
      >
        <Heading
          fontSize={"xs"}
          textTransform={"uppercase"}
          letterSpacing={"wide"}
          {...props}
        >
          {children}
        </Heading>
      </ChakraLink>
    </Link>
  );
};

const Navbar = () => {
  const { user, signOut } = useContext(Admin);

  return (
    <Box
      position={{ base: "sticky", md: "inherit" }}
      top={0}
      width={"100%"}
      zIndex={"1024"}
      py={5}
    >
      <Flex
        direction={"row"}
        display={{ base: "none", md: "flex" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <NavTag href={`/${EDITORIAL}`}>{EDITORIAL}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${ARTWORK}`}>{ARTWORK}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${COMERCIAL}`}>{COMERCIAL}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${FILMS}`}>{FILMS}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${BLOG}`}>{BLOG}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${PUBLICACIONES}`}>{PUBLICACIONES}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/info`}>info</NavTag>
        </Box>
      </Flex>
      {/* mobile menu */}
    </Box>
  );
};

export default Navbar;
