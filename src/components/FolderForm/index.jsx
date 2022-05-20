import React, { Fragment, useState } from "react";
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
import KeyWords from "./KeyWords";
import FileUpload from "./FileUpload";
import CategorySelector from "./CategorySelector";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El titulo es requerido."),
  category: Yup.string().required("La categoria es requerida."),
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
              <CategorySelector
                value={values ? values.category : ""}
                error={errors.category}
                touched={touched.category}
                alreadySelected={folder && folder.category.length > 0}
                onChange={(value) => {
                  setFieldValue("category", value);
                  setFieldTouched("category", true);
                }}
              />
              <KeyWords values={values ? values.keyWords : []} />
              <FormControl>
                <FormLabel fontWeight={"bold"} htmlFor="description">
                  Descripción
                </FormLabel>
                <Editor
                  name="description"
                  value={values ? values.description : ""}
                  onChange={(data) => {
                    setFieldValue("description", data);
                    setFieldTouched("description", true);
                  }}
                />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </FormControl>
              <FileUpload
                values={values ? values.files : []}
                newFiles={newFiles}
                setNewFiles={setNewFiles}
                setDeleteFiles={setDeleteFiles}
              />
              <Button
                width={{ base: "100%", md: "fit-content" }}
                colorScheme="green"
                isLoading={isSubmit}
                loadingText={
                  folder && folder.title.length > 0
                    ? "Guardando cambios"
                    : "Creando la carpeta"
                }
                type="submit"
              >
                {folder && folder.title.length > 0
                  ? "Editar Carpeta"
                  : "Crear Carpeta"}
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
    files: [],
  },
};

export default FolderForm;
