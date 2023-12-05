import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import FolderForm from '../../components/FolderForm';
import getDoc from 'src/actions/getDoc';
import useFetch from 'src/hooks/useFetch';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import { NextSeo } from 'next-seo';
import Title from 'src/components/Title';
import { Box, Flex } from '@chakra-ui/layout';

function Edit() {
  const router = useRouter();
  const { title } = router.query;
  const { data, loading } = useFetch(() => getDoc(title));
  const { onUpdatePost } = useContext(Admin);

  return (
    <Flex mx={'auto'} maxW={'1300px'} direction={'column'}>
      <NextSeo title={`Editar | Merra Marie`} defaultTitle='Merra Marie' />
      <Box as={'header'} mb={[6, 12]}>
        <Title>Editar</Title>
      </Box>
      <Box maxW={['100%', null, '80vw', '70%']}>
        <FolderForm loading={loading} folder={data} onSubmit={onUpdatePost} />
      </Box>
    </Flex>
  );
}

export default withAuth(Edit);
