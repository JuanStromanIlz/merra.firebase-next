import React, { Fragment, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Editor from "./Editor";
import Tags from "./Tags";
import FileUpload from "./FileUpload";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
});

const FolderForm = ({ isSubmit, folder, onSubmit }) => {
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  async function handleSubmit(values) {
    onSubmit({ ...values, newFiles, deleteFiles });
    setNewFiles([]);
    setDeleteFiles([]);
  }

  return (
    <Fragment>
      <Formik
        validationSchema={validationSchema}
        initialValues={folder}
        onSubmit={(values) => handleSubmit(values)}
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
              <Tags values={values?.tags || []} />
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="description">
                  Descripción
                </FormLabel>
                <Editor
                  name="description"
                  value={values?.description || ""}
                  onChange={(data) => {
                    setFieldValue("description", data);
                    setFieldTouched("description", true);
                  }}
                />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </FormControl>
              <FileUpload
                values={values?.files || []}
                newFiles={newFiles}
                setNewFiles={setNewFiles}
                setDeleteFiles={setDeleteFiles}
              />
              <Button
                width={{ base: "100%", md: "fit-content" }}
                colorScheme="green"
                isLoading={isSubmit}
                loadingText={
                  folder?.title?.length > 0
                    ? "Guardando cambios"
                    : "Creando la carpeta"
                }
                type="submit"
              >
                {folder?.title?.length > 0 ? "Editar Carpeta" : "Crear Carpeta"}
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
    tags: [],
    files: [],
  },
};

export default FolderForm;
