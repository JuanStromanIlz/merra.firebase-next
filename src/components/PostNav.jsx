import React, { useContext } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { Admin } from 'src/contexts/AdminContext';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const PostNav = ({ doc }) => {
  const { url } = doc;
  const { user, onDeletePost } = useContext(Admin);
  const router = useRouter();

  const onEdit = () => {
    return router.push(`/admin/edit?title=${url}`);
  };

  if (!user) {
    return null;
  }

  return (
    <Flex flexDirection={'row'} gap={3}>
      <Button
        colorScheme='black'
        borderRadius={'full'}
        variant='outline'
        size='sm'
        leftIcon={<EditIcon />}
        onClick={onEdit}
      >
        Editar
      </Button>
      <Button
        colorScheme='black'
        borderRadius={'full'}
        variant='outline'
        size='sm'
        leftIcon={<DeleteIcon />}
        onClick={() => onDeletePost(doc)}
      >
        Eliminar
      </Button>
    </Flex>
  );
};

export default PostNav;
