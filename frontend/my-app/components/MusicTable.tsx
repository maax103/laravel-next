interface Music {
    id: number;
    title: string;
    artist: string;
    liked: boolean;
}

interface MusicTableProps {
    musics: Music[];
    onLike?: (musicId: number, liked: boolean) => void;
}
  
export const MusicTable = ({ musics, onLike }: MusicTableProps) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-fixed">
            <thead className="bg-gray-50">
            <tr>
                <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                </th>
                <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artista
                </th>

                {onLike && (
                <th className="w-5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                </th>
                )}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {musics.map((music) => (
                <tr key={music.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {music.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {music.artist}
                </td>
                {onLike && (
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                    onClick={() => onLike && onLike(music.id, music.liked)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    >
                    {music.liked ? '❤️' : '🤍'}
                    </button>
                </td>
                )}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};