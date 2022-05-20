import React, { useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  CloseButton,
  Button,
  Stack,
  Image,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { FieldArray } from "formik";

const FileUpload = ({ values, newFiles, setNewFiles, setDeleteFiles }) => {
  const inputRef = useRef();

  const handleNewFiles = (event) => {
    const { files } = event.currentTarget;
    let filesArray = [];
    if (files) {
      [...files].forEach((file) => {
        if (file.type.includes("video/mp4")) {
          filesArray.push({
            url: URL.createObjectURL(file),
            isVideo: true,
            data: file,
          });
        } else {
          filesArray.push({
            url: URL.createObjectURL(file),
            isVideo: false,
            data: file,
          });
        }
      });
      setNewFiles((prev) => [...prev, ...filesArray]);
    }
  };
  const deleteNewFile = (urlDelete) => {
    setNewFiles((prev) => prev.filter(({ url }) => url !== urlDelete));
  };
  const handleDeleteFilesFromDB = (index, remove) => {
    setDeleteFiles((prev) => [...prev, values[index]]);
    remove(index);
  };

  const FilePrev = ({ file: { isVideo, url }, onDelete }) =>
    isVideo ? (
      <GridItem position={"relative"}>
        <video
          src={url}
          alt=""
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            aspectRatio: "4/3",
          }}
        />
        <CloseButton
          onClick={onDelete}
          borderRadius={"2xl"}
          bg={"white"}
          color={"gray.800"}
          position={"absolute"}
          top={2}
          right={2}
        />
      </GridItem>
    ) : (
      <GridItem position={"relative"} overflow="hidden" borderRadius={"md"}>
        <Image
          src={url}
          alt=""
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
          sx={{
            aspectRatio: "4/3",
          }}
        />
        <CloseButton
          onClick={onDelete}
          borderRadius={"2xl"}
          bg={"white"}
          color={"gray.800"}
          position={"absolute"}
          top={2}
          right={2}
        />
      </GridItem>
    );

  return (
    <FormControl>
      <FormLabel fontWeight={"bold"} htmlFor="addFiles">
        Archivos:
      </FormLabel>
      <FieldArray name="files">
        {({ remove }) => (
          <Stack>
            <SimpleGrid columns={{ base: 1, md: 4, lg: 6 }} gap={3}>
              {values.length > 0 &&
                values.map((file, index) => (
                  <FilePrev
                    key={index}
                    file={{ ...file, index }}
                    onDelete={() => handleDeleteFilesFromDB(index, remove)}
                  />
                ))}
              {newFiles.map((file, index) => (
                <FilePrev
                  key={index}
                  file={file}
                  onDelete={() => deleteNewFile(file.url)}
                />
              ))}
            </SimpleGrid>
            <Input
              ref={inputRef}
              id="addFiles"
              type="file"
              multiple
              onChange={handleNewFiles}
              hidden
            />
            <Button
              onClick={() => inputRef.current.click()}
              colorScheme="pink"
              width={{ base: "100%", md: "fit-content" }}
            >
              Subir archivos
            </Button>
          </Stack>
        )}
      </FieldArray>
    </FormControl>
  );
};

export default FileUpload;
