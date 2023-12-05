import React, { useContext } from 'react';
import { Box, Center, Flex } from '@chakra-ui/layout';
import FolderForm from '../../components/FolderForm';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import { NextSeo } from 'next-seo';
import Title from 'src/components/Title';

function NewItem() {
  const { onNewPost } = useContext(Admin);

  return (
    <Flex mx={'auto'} maxW={'1300px'} direction={'column'}>
      <NextSeo title={`Nuevo | Merra Marie`} defaultTitle='Merra Marie' />
      <Box as={'header'} mb={[6, 12]}>
        <Title>Nuevo</Title>
      </Box>
      <Box maxW={['100%', null, '80vw', '70%']}>
        <FolderForm onSubmit={onNewPost} />
      </Box>
    </Flex>
  );
}

export default withAuth(NewItem);
