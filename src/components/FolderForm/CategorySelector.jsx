import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  PUBLICACIONES,
  BLOG,
} from "../../services/foldersNames";

const CategorySelector = ({
  value,
  error,
  touched,
  onChange,
  alreadySelected,
}) => {
  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel fontWeight={"bold"} htmlFor="category">
        Categoria
      </FormLabel>
      <Select
        placeholder={alreadySelected ? value : "Selecciona una categoria"}
        id="category"
        name="category"
        onChange={onChange}
        isDisabled={alreadySelected}
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
  );
};

export default CategorySelector;
