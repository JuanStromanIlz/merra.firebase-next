import React, { useContext } from 'react';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { Admin } from 'src/contexts/AdminContext';
import { DeleteIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const PostNav = ({ doc }) => {
  const { url } = doc;
  const { user, onDeletePost } = useContext(Admin);
  const router = useRouter();

  const onEdit = () => {
    return router.push(`/admin/edit?title=${url}`);
  };

  const sharePost = () => {
    return navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <Flex flexDirection={'row'} gap={3}>
      <Button
        borderRadius={'full'}
        variant='outline'
        size='sm'
        leftIcon={<LinkIcon />}
        colorScheme='white'
        onClick={sharePost}
      >
        Compartir
      </Button>
      {user && (
        <>
          <IconButton
            colorScheme='white'
            borderRadius={'full'}
            variant='outline'
            size='sm'
            icon={<DeleteIcon />}
            onClick={() => onDeletePost(doc)}
          />
          <IconButton
            colorScheme='white'
            borderRadius={'full'}
            variant='outline'
            size='sm'
            icon={<EditIcon />}
            onClick={onEdit}
          />
        </>
      )}
    </Flex>
  );
};

export default PostNav;
