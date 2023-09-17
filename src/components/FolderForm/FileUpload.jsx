import React, { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  CloseButton,
  Button,
  Stack,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import { FieldArray } from 'formik';
import File from '../File';

const FileUpload = ({ values, newFiles, setNewFiles, setDeleteFiles }) => {
  const inputRef = useRef();

  const handleNewFiles = (event) => {
    const { files } = event.currentTarget;
    let filesArray = [];
    if (files) {
      [...files].forEach((file) => {
        if (file.type.includes('video/mp4')) {
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

  const FilePrev = ({ file, onDelete }) => {
    return (
      <GridItem position={'relative'}>
        <File data={file} controls={false} />
        <CloseButton
          onClick={onDelete}
          borderRadius={'2xl'}
          bg={'white'}
          color={'gray.800'}
          position={'absolute'}
          top={2}
          right={2}
        />
      </GridItem>
    );
  };

  return (
    <FormControl>
      <FormLabel fontSize='md' fontWeight={'bold'} htmlFor='addFiles'>
        Archivos:
      </FormLabel>
      <FieldArray name='files'>
        {({ remove }) => (
          <Stack>
            <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} gap={3}>
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
              id='addFiles'
              type='file'
              multiple
              onChange={handleNewFiles}
              hidden
            />
            <Button
              onClick={() => inputRef.current.click()}
              colorScheme='brand'
              variant='outline'
              width={{ base: '100%', md: 'fit-content' }}
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
