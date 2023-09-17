import React, { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import FolderForm from '../../components/FolderForm';
import Title from 'src/components/Title';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import withLoading from 'src/hoc/withLoading';

function NewItem() {
  const { onNewPost, loading } = useContext(Admin);

  return (
    <Box px={6}>
      <Title as={'h1'} fontSize='4xl' cursor={'pointer'}>
        Nueva Publicacion
      </Title>
      <FolderForm loading={loading} onSubmit={onNewPost} />
    </Box>
  );
}

export default withAuth(withLoading(NewItem));
