import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import FolderForm from '../../components/FolderForm';
import Title from 'src/components/Title';
import getDoc from 'src/actions/getDoc';
import useFetch from 'src/hooks/useFetch';
import { Admin } from 'src/contexts/AdminContext';
import { Box } from '@chakra-ui/react';
import withAuth from 'src/hoc/withAuth';
import withLoading from 'src/hoc/withLoading';

function Edit() {
  const router = useRouter();
  const { title } = router.query;
  const { data, loading } = useFetch(() => getDoc(title));
  const { onEditPost } = useContext(Admin);

  return (
    <Box px={6}>
      <Title as={'h1'} fontSize='4xl' cursor={'pointer'}>
        Editar
      </Title>
      <FolderForm loading={loading} folder={data} onSubmit={onEditPost} />
    </Box>
  );
}

export default withAuth(withLoading(Edit));
