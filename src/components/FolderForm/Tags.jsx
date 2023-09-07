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

const Tags = ({ values }) => {
  const [tags, setNewTag] = useState("");

  const handleTag = (push) => {
    setNewTag((prev) => {
      push(prev);
      document.getElementById("addTag").focus();
      return "";
    });
  };

  return (
    <FormControl>
      <FormLabel fontWeight={"bold"} htmlFor="addTag">
        Tags
      </FormLabel>
      <FieldArray name="tags">
        {({ pop, push }) => (
          <Stack>
            <Field
              width={"50%"}
              as={Input}
              id="addTag"
              value={tags}
              onChange={(event) => setNewTag(event.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              placeholder="Agregar tag"
            />
            <Button
              onClick={() => handleTag(push)}
              width={"fit-content"}
              colorScheme="pink"
              disabled={tags.length === 0}
            >
              Agregar
            </Button>
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
          </Stack>
        )}
      </FieldArray>
    </FormControl>
  );
};

export default Tags;
