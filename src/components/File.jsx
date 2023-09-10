import React from 'react';
import { Box, Img } from '@chakra-ui/react';

// const landscapeSet = (url) => {
//   const img = new Image();
//   img.src = file.url;
//   img.onload = () =>
//     landscapes.push({
//       landscape: img.height < img.width,
//       width: img.width,
//       height: img.height,
//     });
// };

const File = ({ data, onClick, ...rest }) => {
  // const [landscape, setLandscape] = useState(false);
  const { url, name, isVideo } = data;

  // const onLoad = ({ target: img }) => setLandscape(img.height < img.width);

  return !isVideo ? (
    <Img
      src={url}
      alt={name}
      // borderRadius={'md'}
      objectFit={'contain'}
      maxHeight={'100%'}
      // onLoad={onLoad}
      onClick={onClick}
      {...rest}
    />
  ) : (
    <Box
      as='video'
      controls
      src={url}
      borderRadius={'md'}
      overflow={'hidden'}
      maxHeight={'100%'}
      {...rest}
    />
  );
};

export default File;
