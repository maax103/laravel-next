'use client';

import { MusicTable } from "@/components/MusicTable";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Music {
    id: number;
    title: string;
    artist: string;
    liked: boolean;
}

type User = {
    id: number;
    name: string;
}

export default function User() {
    const params = useParams();
    const [musics, setMusics] = useState<Music[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = params?.id;
                const token = sessionStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                const [musicRes, userRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/music/user/${user_id}`, { headers, method: "POST" }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`, { headers }),
                ]);

                const [musicData, userData] = await Promise.all([
                    musicRes.json(),
                    userRes.json(),
                ]);

                setUser(userData);
                setMusics(musicData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [params])

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {user ? (
                        `Essas são as músicas curtidas por ${user.name}`
                    ) : 'Carregando informações do usuário...'}
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400">
                    <Link 
                        href="/dashboard" 
                        className="w-full bg-blue-100 hover:bg-blue-200 p-3 rounded-lg font-semibold transition"
                    >
                        Voltar ao dashboard
                    </Link>
                </p>
            </div>

            {musics.length > 0 ? (
            <div className='mb-8'>
                <MusicTable
                    musics={musics}
                    />    
            </div>
            ) : 'Nenhuma música encontrada'}
            
        </div>
    )
}