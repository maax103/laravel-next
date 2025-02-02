import { User } from '@/types/UserType';
import { useRouter } from 'next/navigation';
import DataTable, { TableColumn } from 'react-data-table-component';

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();

  const handleViewMusics = (userId: number) => {
    router.push(`/usuario/${userId}`);
  };

  const columns: TableColumn<User>[] = [
    {
      name: 'NOME',
      selector: row => row.name,
      sortable: true,
      width: '40%',
    },
    {
      name: 'E-MAIL',
      selector: row => row.email,
      sortable: true,
      width: '40%',
    },
    {
      name: 'AÇÕES',
      cell: row => (
        <button
          onClick={() => handleViewMusics(row.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Ver Músicas
        </button>
      ),
      width: '20%',
    }
  ];


  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        responsive
        paginationComponentOptions={
          {
            rowsPerPageText: 'Linhas por página:',
            rangeSeparatorText: 'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todas'
          }
        }
      />
    </div>
  );
};
