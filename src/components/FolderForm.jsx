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
  GridItem,
  SimpleGrid,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  PUBLICACIONES,
  BLOG,
} from "../services/foldersNames";
// import Editor from "./Editor";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
  category: Yup.string().required("La categoria es requerida."),
});

const FolderForm = ({ isSubmit, folder, onSubmit }) => {
  const [newKeyWord, setNewKeyWord] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

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
    onSubmit({ ...values, newImages, deleteImages });
    setNewImages([]);
    setNewKeyWord("");
  }

  function handleDeleteImagesFromDB(index, remove) {
    setDeleteImages((prev) => [...prev, folder.images[index]]);
    remove(index);
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
              <FormControl isInvalid={errors.category && touched.category}>
                <FormLabel fontWeight={"bold"} htmlFor="category">
                  Categoria
                </FormLabel>
                <Select
                  placeholder="Selecciona una categoria"
                  id="category"
                  name="category"
                  onChange={({ target: { value = EDITORIAL } }) => {
                    setFieldValue("category", value);
                    setFieldTouched("category", true);
                  }}
                >
                  <option value={EDITORIAL}>{EDITORIAL}</option>
                  <option value={ARTWORK}>{ARTWORK}</option>
                  <option value={COMERCIAL}>{COMERCIAL}</option>
                  <option value={FILMS}>{FILMS}</option>
                  <option value={PUBLICACIONES}>{PUBLICACIONES}</option>
                  <option value={BLOG}>{BLOG}</option>
                </Select>
                <ErrorMessage name="category" component={FormErrorMessage} />
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
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="description">
                  Descripción
                </FormLabel>
                {/* <Editor
                  name="description"
                  value={values.description}
                  onChange={(data) => {
                    setFieldValue("description", data);
                    setFieldTouched("description", true);
                  }}
                /> */}
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
                                onClick={() =>
                                  handleDeleteImagesFromDB(index, remove)
                                }
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
    category: "",
    description: "",
    keyWords: [],
    images: [],
  },
};

export default FolderForm;
