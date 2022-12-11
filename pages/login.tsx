import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import type { FormEventHandler } from "react";
import { ActionButton } from "../components/Buttons";
import { Logo } from "../public/assets"; //don't delete

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    try {
      const user = await axios.post("/api/auth/login", credentials);

      if (user.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError: AxiosError = error;
      if (axiosError.response.status === 401)
        if (typeof window !== undefined) window.alert("Некорректные данные");
      console.error(error);
    }
  };
  return (
    <main className={`p-5`}>
      <Link href="/">
        <a className={`hover:text-cyan-500 p-5`}>Главная</a>
      </Link>
      <div className={`flex justify-center pt-10`}>
        <form
          className="flex flex-col items-center gap-3 max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label htmlFor="username">Логин</label>
            <input
              className={inputStyle}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label htmlFor="password">Пароль</label>
            <input
              className={inputStyle}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <ActionButton>Войти</ActionButton>
          </div>
        </form>
      </div>
    </main>
  );
}
