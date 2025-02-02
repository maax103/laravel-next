import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();

  const handleViewMusics = (userId: number) => {
    router.push(`/usuario/${userId}`);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="table-fixed w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th className="w-5 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm flex justify-center">
                <button
                  onClick={() => handleViewMusics(user.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Ver Músicas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
