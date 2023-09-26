import React, { useContext } from 'react';
import FolderForm from '../../components/FolderForm';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import FolderLayout from 'src/components/FolderLayout';

function NewItem() {
  const { onNewPost } = useContext(Admin);

  return (
    <FolderLayout title={'Nuevo Post'}>
      <FolderForm onSubmit={onNewPost} />
    </FolderLayout>
  );
}

export default withAuth(NewItem);
