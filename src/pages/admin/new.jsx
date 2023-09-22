import React, { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import FolderForm from '../../components/FolderForm';
import Title from 'src/components/Title';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';

function NewItem() {
  const { onNewPost } = useContext(Admin);

  return (
    <Box px={6} pb={4} pt={20}>
      <Title as={'h1'} fontSize='4xl' cursor={'pointer'}>
        Nueva post
      </Title>
      <FolderForm onSubmit={onNewPost} />
    </Box>
  );
}

export default withAuth(NewItem);
