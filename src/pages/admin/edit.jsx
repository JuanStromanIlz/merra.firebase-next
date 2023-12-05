import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import FolderForm from '../../components/FolderForm';
import getDoc from 'src/actions/getDoc';
import useFetch from 'src/hooks/useFetch';
import { Admin } from 'src/contexts/AdminContext';
import withAuth from 'src/hoc/withAuth';
import FolderLayout from 'src/components/FolderLayout';
import { NextSeo } from 'next-seo';

function Edit() {
  const router = useRouter();
  const { title } = router.query;
  const { data, loading } = useFetch(() => getDoc(title));
  const { onUpdatePost } = useContext(Admin);

  return (
    <>
      <NextSeo title={`Editar | Merra Marie`} defaultTitle='Merra Marie' />
      <FolderLayout title={'Editar'}>
        <FolderForm loading={loading} folder={data} onSubmit={onUpdatePost} />
      </FolderLayout>
    </>
  );
}

export default withAuth(Edit);
