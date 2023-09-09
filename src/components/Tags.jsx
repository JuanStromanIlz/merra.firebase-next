import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Icon,
} from '@chakra-ui/react';

const Tags = ({ tags = [], ...rest }) => {
  if (!tags?.length) {
    return null;
  }
  return (
    <Breadcrumb separator='' {...rest}>
      {tags.map((tag) => (
        <BreadcrumbItem key={tag}>
          <BreadcrumbLink _disabled={true} textTransform={'capitalize'}>
            {tag}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Tags;
