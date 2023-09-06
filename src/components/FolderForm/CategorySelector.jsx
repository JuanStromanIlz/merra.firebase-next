import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  InputGroup,
  Input,
  InputRightAddon,
  InputRightElement,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import * as FOLDERS from "../../services/foldersNames";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Title from "../Title";

const CategorySelector = ({
  value,
  error,
  touched,
  onChange,
  alreadySelected,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (alreadySelected) {
      onChange(alreadySelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel fontWeight={"bold"} htmlFor="category">
        Categoria
      </FormLabel>
      <InputGroup>
        <Input
          isReadOnly
          value={value}
          isDisabled={alreadySelected}
          placeholder="Selecciona una categoria"
          onClick={onOpen}
          id="category"
          name="category"
        />
        <InputRightElement>
          <ChevronDownIcon />
        </InputRightElement>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent
          bg="black"
          borderColor={"red.500"}
          borderWidth={1}
          borderRadius={"md"}
          m={6}
        >
          <ModalHeader>
            <Title>Selecciona una categoria:</Title>
          </ModalHeader>
          <ModalBody>
            <Flex direction={"column"}>
              {Object.values(FOLDERS).map((f) => (
                <Box py={1} key={f}>
                  <Title
                    onClick={() => {
                      onChange(f);
                      onClose();
                    }}
                    fontSize={"xl"}
                    cursor={"pointer"}
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                  >
                    {f}
                  </Title>
                </Box>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ErrorMessage name="category" component={FormErrorMessage} />
    </FormControl>
  );
};

export default CategorySelector;
