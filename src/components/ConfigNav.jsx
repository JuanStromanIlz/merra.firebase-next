import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";

const ConfigNav = () => {
  return (
    <Flex
      borderBottomWidth={1}
      borderTopWidth={1}
      borderRadius={"md"}
      borderColor={"brand.500"}
      py={3}
      px={3}
      flexDirection={"row"}
      gap={1}
    >
      <Box>
        <IconButton
          colorScheme="green"
          isRound
          variant="outline"
          _hover={{ bg: "green.900" }}
          icon={<EditIcon />}
        />
      </Box>
      <Box>
        <IconButton
          colorScheme="brand"
          isRound
          variant="outline"
          icon={<DeleteIcon />}
        />
      </Box>
      <Button
        colorScheme="brand"
        // borderRadius="full"
        variant="link"
        fontWeight={"bold"}
        ml={"auto"}
      >
        compartir
      </Button>
    </Flex>
  );
};

export default ConfigNav;
