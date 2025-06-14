import ModalButton from '@/components/shared/components/table/modal-button';
import PageHeader from '@/components/shared/page-header';
import CreateRole from './create-role';
import UsersTable from './users-table';
import { useRoles } from '@/hooks/roles-hook';
import { useAppSelector } from '@/hooks/store-hook';
import { useEffect } from 'react';

const pageHeader = {
  title: 'Roles and Permissions ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Role Management & Permission',
    },
  ],
};

export default function BlankPage() {
  const {handleGetRoles, isLoading} = useRoles();
  const {data, isDataLoaded} = useAppSelector((state) => state.Roles);

  useEffect(() => {
    if(!isDataLoaded){
      handleGetRoles();
    }
  },[data])
  console.log("Data", data);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <UsersTable data={data} isLoading={isLoading}/>
    </>
  );
}
