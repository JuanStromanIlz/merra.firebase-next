import React, { Fragment, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Tag,
  Editable,
  EditablePreview,
  EditableInput,
  CloseButton,
  Button,
  Stack,
  Wrap,
  WrapItem,
  Image,
  Text,
  GridItem,
  SimpleGrid,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Editor from "./Editor";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
});

const FolderForm = ({ isSubmit, folder, onSubmit }) => {
  const [newKeyWord, setNewKeyWord] = useState("");
  const [newImages, setNewImages] = useState([]);

  function handleKeyWord(push) {
    setNewKeyWord((prev) => {
      push(prev);
      document.getElementById("addKeyWord").focus();
      return "";
    });
  }

  function handleNewImages(event) {
    const { files } = event.currentTarget;
    let filesArray = [];
    if (files) {
      [...files].forEach((file) => {
        filesArray.push({
          url: URL.createObjectURL(file),
          data: file,
        });
      });
      setNewImages([...filesArray]);
    }
  }
  function deleteNewImage(urlDelete) {
    setNewImages((prev) => prev.filter(({ url }) => url !== urlDelete));
  }

  function handleSubmit(values) {
    onSubmit({ ...values, newImages: newImages });
    setNewImages([]);
    setNewKeyWord("");
  }

  return (
    <Fragment>
      <Formik
        validationSchema={validationSchema}
        initialValues={folder}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <Stack gap={3}>
              <FormControl isInvalid={errors.title && touched.title}>
                <FormLabel fontWeight={"bold"} htmlFor="title">
                  Titulo
                </FormLabel>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder="Nuevo titulo"
                />
                <ErrorMessage name="title" component={FormErrorMessage} />
              </FormControl>
              <FormControl isInvalid={errors.sub && touched.sub}>
                <FormLabel fontWeight={"bold"} htmlFor="sub">
                  Subtitulo
                </FormLabel>
                <Field
                  as={Input}
                  id="sub"
                  name="sub"
                  placeholder="Nuevo subtitulo"
                />
                <ErrorMessage name="sub" component={FormErrorMessage} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="addKeyWord">
                  Palabras clave
                </FormLabel>
                <FieldArray name="keyWords">
                  {({ remove, push }) => (
                    <Stack>
                      {values.keyWords.length > 0 && (
                        <Wrap>
                          {values.keyWords.map((word, index) => (
                            <WrapItem key={index}>
                              <Tag
                                width={"fit-content"}
                                borderRadius={"2xl"}
                                size={"lg"}
                                alignItems={"center"}
                                gap={1}
                                pr={0}
                              >
                                <Editable defaultValue={word}>
                                  <EditablePreview />{" "}
                                  <Field
                                    as={EditableInput}
                                    name={`keyWord[${index}]`}
                                  />
                                </Editable>
                                <CloseButton
                                  onClick={() => remove(index)}
                                  borderRadius={"2xl"}
                                />
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
                      <Button
                        onClick={() => handleKeyWord(push)}
                        width={"fit-content"}
                      >
                        Agregar
                      </Button>
                    </Stack>
                  )}
                </FieldArray>
              </FormControl>
              <Flex gap={3}>
                <FormControl>
                  <Text fontWeight={"bold"} mb={3}>
                    Github
                  </Text>
                  <Field as={Input} name="github.name" id="github.link" />
                  <FormHelperText mb={2}>Nombre visible</FormHelperText>
                  <Field as={Input} name="github.link" id="github.link" />
                  <FormHelperText>El link al que va a apuntar</FormHelperText>
                </FormControl>
                <FormControl>
                  <Text fontWeight={"bold"} mb={3}>
                    Online
                  </Text>
                  <Field as={Input} name="online.name" id="online.link" />
                  <FormHelperText mb={2}>Nombre visible</FormHelperText>
                  <Field as={Input} name="online.link" id="online.link" />
                  <FormHelperText>El link al que va a apuntar</FormHelperText>
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="description">
                  Descripción
                </FormLabel>
                <Editor
                  name="description"
                  value={values.description}
                  onChange={(data) => {
                    console.log(data);
                    setFieldValue("description", data);
                    setFieldTouched("description", true);
                  }}
                />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="addImage">
                  Imagenes
                </FormLabel>
                <FieldArray name="images">
                  {({ remove }) => (
                    <Stack>
                      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={3}>
                        {values.images.length > 0 &&
                          values.images.map(({ url }, index) => (
                            <GridItem key={index} position={"relative"}>
                              <Image
                                src={url}
                                alt=""
                                width={"100%"}
                                height={"100%"}
                                objectFit={"cover"}
                                sx={{
                                  aspectRatio: "1",
                                }}
                              />
                              <CloseButton
                                onClick={() => remove(index)}
                                borderRadius={"2xl"}
                                bg={"white"}
                                color={"gray.800"}
                                position={"absolute"}
                                top={2}
                                right={2}
                              />
                            </GridItem>
                          ))}
                        {newImages.map(({ url }) => (
                          <GridItem key={url} position={"relative"}>
                            <Image
                              src={url}
                              alt=""
                              width={"100%"}
                              height={"100%"}
                              objectFit={"cover"}
                              sx={{
                                aspectRatio: "1",
                              }}
                            />
                            <CloseButton
                              onClick={() => deleteNewImage(url)}
                              borderRadius={"2xl"}
                              bg={"white"}
                              color={"gray.800"}
                              position={"absolute"}
                              top={2}
                              right={2}
                            />
                          </GridItem>
                        ))}
                      </SimpleGrid>
                      <Input
                        id="addImage"
                        type="file"
                        multiple
                        accept=".jpg, .jpeg, .png"
                        onChange={handleNewImages}
                      />
                    </Stack>
                  )}
                </FieldArray>
              </FormControl>
              <Button
                colorScheme={"brand"}
                width={"fit-content"}
                isLoading={isSubmit}
                loadingText={
                  folder.title.length > 0
                    ? "Guardando cambios"
                    : "Creando la carpeta"
                }
                type="submit"
              >
                {folder.title.length > 0 ? "Editar Carpeta" : "Crear Carpeta"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

FolderForm.defaultProps = {
  folder: {
    title: "",
    sub: "",
    description: "",
    keyWords: [],
    github: {
      name: "",
      link: "",
    },
    online: {
      name: "",
      link: "",
    },
    images: [],
  },
};

export default FolderForm;
