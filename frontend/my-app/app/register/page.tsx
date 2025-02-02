"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [canSendForm, setCanSendForm] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    if (!canSendForm) return;

    setCanSendForm(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword }),
      });

      if (!res.ok) {
        console.error("Erro ao criar usuário:", res.statusText);
        return;
      }

      const data = await res.json();
      console.log(data);

      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setCanSendForm(true);
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

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

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Registrar
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Já tem uma conta?{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
