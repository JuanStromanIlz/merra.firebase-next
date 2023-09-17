import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import FolderForm from '../../components/FolderForm';
import Title from 'src/components/Title';
import getDoc from 'src/actions/getDoc';
import useFetch from 'src/hooks/useFetch';
import { Admin } from 'src/contexts/AdminContext';
import { Box } from '@chakra-ui/react';
import withAuth from 'src/hoc/withAuth';

function Edit() {
  const router = useRouter();
  const { title } = router.query;
  const { data, loading: loadingDoc } = useFetch(() => getDoc(title));
  const { onEditPost, loading } = useContext(Admin);

  return (
    <Box px={6}>
      <Title as={'h1'} fontSize='4xl' cursor={'pointer'}>
        Editar
      </Title>
      <FolderForm
        loading={loadingDoc || loading}
        folder={data}
        onSubmit={onEditPost}
      />
    </Box>
  );
}

export default withAuth(Edit);
