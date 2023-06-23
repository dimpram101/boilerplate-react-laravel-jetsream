import DashboardLayout from '@/Layouts/DashboardLayout';
import React, { useMemo, useState, useReducer } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useForm } from '@inertiajs/react';
import LinkButton from '@/Components/LinkButton';
import { Dialog, DialogContent } from "@mui/material";
import useTypedPage from '@/Hooks/useTypedPage';
import route from 'ziggy-js';
import Loading from '@/Components/Animation/Loading';

interface Props {
  users: Array<{
    id: number,
    name: string,
    email: string,
    phone_number: string
    roles: [{
      id: number,
      name: string,
    }]
  }>
}

const Index = ({ users }: Props) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // const [response, dispatch] = useResponse();
  const page = useTypedPage();
  const userId = page.props.auth.user?.id;
  const deleteForm = useForm();

  const dataColumns = useMemo(() =>
    [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
      },
      {
        accessorFn: (row) => row.roles.map((role) => role.name).join(', '),
        header: 'Status',
      }
    ] as MRT_ColumnDef<typeof users[0]>[]
    , [users]);

  const deleteUserHandler = () => {
    deleteForm.delete(route('user.destroy', selectedId!));
    setSelectedId(null);
  }

  return (
    <DashboardLayout>
      <Dialog open={openDelete} onClose={() => { setOpenDelete(false); setSelectedId(null); }}>
        <DialogContent className='w-80'>
          <h1 className='font-bold text-2xl text-center'>Are you sure want to delete this data?</h1>
          <div className="flex flex-row justify-around items-center mt-4 text-lg">
            <button className='px-4 py-2 text-white rounded-lg font-bold bg-red-500 hover:bg-red-600' onClick={() => {
              setOpenDelete(false);
              deleteUserHandler();
            }}>Yes</button>
            <button className='px-4 py-2 text-white rounded-lg font-bold bg-[#137CBD] hover:bg-[#1587ce]' onClick={() => {
              setOpenDelete(false);
              setSelectedId(null);
            }}>No</button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className='text-3xl font-bold'>User</h1>
          <div className="flex gap-3 items-center">
            <LinkButton href={route('user.create')} label='Add User' />
          </div>
        </div>
        <div className="w-full mt-4">
          <MaterialReactTable
            columns={dataColumns}
            data={users}
            enableColumnFilters
            enableRowActions
            enablePagination
            enableSorting
            enableBottomToolbar
            enableTopToolbar
            enableRowNumbers
            positionActionsColumn='last'
            renderRowActions={({ row }) => (
              <div className='flex gap-2'>
                <LinkButton href={route('user.show', row.original.id)} label='Show' />
                <LinkButton href={route('user.edit', row.original.id)} label='Edit' className='bg-orange-400 hover:bg-orange-500'/>
                {userId !== row.original.id &&
                  <button className='px-4 py-2 text-white rounded-lg font-bold bg-red-500 hover:bg-red-600' onClick={() => {
                    setSelectedId(row.original.id)
                    setOpenDelete(true);
                  }}>Delete</button>
                }
              </div>
            )}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index