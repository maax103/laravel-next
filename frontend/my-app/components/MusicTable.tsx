import { Music } from "@/types/MusicType";
import DataTable, { TableColumn } from "react-data-table-component";

type MusicTableProps =  {
    musics: Music[];
    onLike?: (musicId: number, liked: boolean) => void;
}
  
export const MusicTable = ({ musics, onLike }: MusicTableProps) => {

    const columns: TableColumn<Music>[] = [
            {
                name: 'Música',
                selector: music => music.title,
                sortable: true,
                width: '40%',
            },
            {
                name: 'Artista',
                selector: music => music.artist,
                sortable: true,
                width: '40%',
            },
            {
                name: 'Curtir',
                cell: music => (
                    <button
                        onClick={() => onLike && onLike(music.id, music.liked)}
                        className="pl-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        {music.liked ? '❤️' : '🤍'}
                    </button>
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