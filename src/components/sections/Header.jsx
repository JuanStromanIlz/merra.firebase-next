import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Title from '../Title';
import Tags from '../Tags';

const Header = ({ doc, children }) => {
  const [height, setDim] = useState('100%');
  const { title = '', tags, files = [{}] } = doc;
  const { url } = files[0] || {};

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      if (typeof window !== 'undefined') {
        // detect window screen width function
        setDim(window?.innerHeight);
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      h={height}
      w={'100%'}
      backgroundImage={url}
      backgroundPosition={'center'}
      backgroundRepeat={'repeat-x'}
      backgroundSize={['cover', 'contain']}
      direction='column'
      justifyContent={'space-between'}
    >
      <Flex
        height={'100%'}
        direction='column'
        flex={1}
        px={3}
        pt={'56px'}
        bgGradient={'linear(to-b, transparent 0%, blackAlpha.600 100%)'}
      >
        <Box flexGrow={1}>
          <Title position={'sticky'} top={'56px'}>
            {title}
          </Title>
        </Box>
        <Box mt={'auto'} py={3}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
