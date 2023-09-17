import React from 'react';
import { Box, Img } from '@chakra-ui/react';

const File = ({ data, onClick, ...rest }) => {
  const { url, name, isVideo } = data;
  return !isVideo ? (
    <Img
      src={url}
      alt={name}
      objectFit={'contain'}
      maxHeight={'100%'}
      onClick={onClick}
      {...rest}
    />
  ) : (
    <Box
      as='video'
      controls
      src={url}
      overflow={'hidden'}
      maxHeight={'100%'}
      {...rest}
    />
  );
};

export default File;
