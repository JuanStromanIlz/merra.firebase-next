import React, { useContext } from 'react';
import FolderForm from '../../components/FolderForm';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import FolderLayout from 'src/components/FolderLayout';
import { NextSeo } from 'next-seo';

function NewItem() {
  const { onNewPost } = useContext(Admin);

  return (
    <>
      <NextSeo title={`Nuevo | Merra Marie`} defaultTitle='Merra Marie' />
      <FolderLayout title={'Nuevo Post'}>
        <FolderForm onSubmit={onNewPost} />
      </FolderLayout>
    </>
  );
}

export default withAuth(NewItem);
