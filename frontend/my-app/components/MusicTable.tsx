import { Music } from "@/types/MusicType";
import Link from "next/link";
import DataTable, { TableColumn } from "react-data-table-component";

type MusicTableProps =  {
    musics: Music[];
    onLike?: (musicId: number, liked: boolean) => void;
}
  
export const MusicTable = ({ musics, onLike }: MusicTableProps) => {

    const columns: TableColumn<Music>[] = [
            {
                name: 'TÍTULO',
                selector: music => music.title,
                sortable: true,
                width: '40%',
            },
            {
                name: 'ARTISTA',
                selector: music => music.artist,
                sortable: true,
                width: '40%',
            },
            {
                name: 'AÇÕES',
                cell: music => (

                    <div className="flex gap-6 justify-center items-center">
                        <button
                            onClick={() => onLike && onLike(music.id, music.liked)}
                            className="pl-2 text-red-500 hover:text-red-600 transition-colors font-mono"
                            >
                            {music.liked ? '❤️' : '🤍'}
                        </button>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            <Link href={music.url} target="_blank" rel="noreferrer">
                                <span className="text-gray-500 font-mono">▶</span>
                            </Link>
                        </p>
                    </div>
                ),
                width: '20%',
                
            }
        ];

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <DataTable
                columns={columns}
                data={musics}
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