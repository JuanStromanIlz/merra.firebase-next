import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Tag,
  CloseButton,
  Button,
  Stack,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import { Field, FieldArray } from "formik";

const KeyWords = ({ values }) => {
  const [newKeyWord, setNewKeyWord] = useState("");

  const handleKeyWord = (push) => {
    setNewKeyWord((prev) => {
      push(prev);
      document.getElementById("addKeyWord").focus();
      return "";
    });
  };

  return (
    <FormControl>
      <FormLabel fontWeight={"bold"} htmlFor="addKeyWord">
        Palabras clave
      </FormLabel>
      <FieldArray name="keyWords">
        {({ pop, push }) => (
          <Stack>
            {values.length > 0 && (
              <Wrap>
                {values.map((word, index) => (
                  <WrapItem key={index}>
                    <Tag
                      width={"fit-content"}
                      borderRadius={"2xl"}
                      size={"lg"}
                      alignItems={"center"}
                      gap={1}
                      pr={index + 1 === values.length && 0}
                    >
                      <Text>{word}</Text>
                      {index + 1 === values.length && (
                        <CloseButton
                          onClick={() => pop(index)}
                          borderRadius={"2xl"}
                        />
                      )}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            )}
            <Field
              width={"50%"}
              as={Input}
              id="addKeyWord"
              value={newKeyWord}
              onChange={(event) => setNewKeyWord(event.target.value)}
              placeholder="Agregar palabra clave"
            />
            <Button onClick={() => handleKeyWord(push)} width={"fit-content"}>
              Agregar
            </Button>
          </Stack>
        )}
      </FieldArray>
    </FormControl>
  );
};

export default KeyWords;
