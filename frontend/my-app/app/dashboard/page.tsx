'use client';

import { useEffect, useState } from 'react';
import { UserTable } from '@/components/UserTable';
import { MusicTable } from '@/components/MusicTable';
import { UserMusicTable } from '@/components/UserMusicTable';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Music {
  id: number;
  title: string;
  artist: string;
  liked: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [musics, setMusics] = useState<Music[]>([]);
  const [likes, setLikes] = useState<Music[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.replace('/');
      return;
    }
    setLoading(false);
    
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, musicsRes, likesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/music`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/music-users`, { headers }),
        ]);

        const [usersData, musicsData, likesData] = await Promise.all([
          usersRes.json(),
          musicsRes.json(),
          likesRes.json(),
        ]);

        setUsers(usersData);
        setLikes(likesData);
        setMusics(
          musicsData.map((music: Music) => ({
            ...music,
            liked: !!likesData.find((like: Music) => like.id === music.id),
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleLike = async (musicId: number, liked: boolean) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/music/${musicId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const music = musics.find((music) => music.id === musicId) as Music;
            if (liked) {
                setLikes((prevLikes) => prevLikes.filter((like) => like.id !== musicId));
                setMusics((prevMusics) => prevMusics.map((prevMusic) => {
                    if (prevMusic.id === musicId) return {...prevMusic, liked: false};
                    return prevMusic;
                }));
            } else {
                setLikes((prevLikes) => [...prevLikes, music]);
                setMusics((prevMusics) => prevMusics.map((prevMusic) => {
                    if (prevMusic.id === musicId) return {...prevMusic, liked: true};
                    return prevMusic;
                }));
            }
        }   

    } catch (error) {
        console.error('Erro ao dar like:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/')
  };

  if (loading) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <button 
            className="text-center text-gray-600 dark:text-gray-400 bg-blue-100 hover:bg-blue-200 p-3 rounded-lg font-semibold transition"
            onClick={handleLogout}
          >
            Desconectar
          </button>
        </div>

        {likes.length > 0 && (
        <div className='mb-8'>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Veja as músicas que você curtiu</h2>
            <UserMusicTable
                musics={musics.reduce((result: Music[], music) => {   
                    const liked = likes.some((like) => like.id === music.id);
                    
                    if (liked) result.push({...music, liked});
                    return result;
                }, [])}
                onLike={handleLike}
                />    
        </div>
        )}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Todos os usuários</h2>
            <UserTable users={users} />
        </div>

        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Todas as músicas</h2>
            <MusicTable musics={musics} onLike={handleLike} />
        </div>
    </div>
  );
};