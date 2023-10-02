import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Tag,
  Button,
  TagCloseButton,
  HStack,
  TagLabel,
  Flex,
} from '@chakra-ui/react';
import { Field, FieldArray } from 'formik';

const Tags = ({ values }) => {
  const [tags, setNewTag] = useState('');

  const handleTag = (push) => {
    setNewTag((prev) => {
      push(prev);
      document.getElementById('addTag').focus();
      return '';
    });
  };

  return (
    <FormControl gap={3}>
      <FormLabel fontSize='md' fontWeight={'bold'} htmlFor='addTag'>
        Tags
      </FormLabel>
      <FieldArray name='tags'>
        {({ pop, push }) => (
          <Flex direction={'column'} gap={3}>
            <Flex direction={'row'} gap={3}>
              <Field
                as={Input}
                id='addTag'
                value={tags}
                variant='filled'
                onChange={(event) => setNewTag(event.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                placeholder='Agregar tag'
              />
              <Button
                onClick={() => handleTag(push)}
                colorScheme='brand'
                // variant='outline'
                disabled={tags.length === 0}
              >
                Agregar
              </Button>
            </Flex>
            {values.length > 0 && (
              <HStack spacing={1}>
                {values.map((word, index) => (
                  <Tag
                    key={word}
                    borderRadius={'full'}
                    variant='solid'
                    colorScheme='brand'
                  >
                    <TagLabel>{word}</TagLabel>
                    {index + 1 === values.length && (
                      <TagCloseButton onClick={() => pop(index)} />
                    )}
                  </Tag>
                ))}
              </HStack>
            )}
          </Flex>
        )}
      </FieldArray>
    </FormControl>
  );
};

export default Tags;
