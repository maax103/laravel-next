"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formCanBeSubmitted, setFormCanBeSubmitted] = useState(true);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      router.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get('from');
    if (from === 'register') {
      alert("Usuário criado com sucesso!");
    }
  },[])

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!formCanBeSubmitted) return;
    setFormCanBeSubmitted(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
          alert("E-mail ou senha incorretos");
          setFormCanBeSubmitted(true);
          return;
      }

      if (!res.ok) {
          alert("Erro ao autenticar usuário: " +  res.statusText);
          setFormCanBeSubmitted(true);
          return;
      }

      const data = await res.json();

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (error) {
        if (error instanceof Error) alert("Erro ao autenticar usuário: " + error.message);
        else console.error("Erro ao autenticar usuário");
        setFormCanBeSubmitted(true);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
