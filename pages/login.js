import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    const user = await axios.post("/api/auth/login", credentials);

    if (user.status === 200) {
      router.push("/dashboard");
    }
  };
  return (
    <main className={`p-5`}>
      <Link href={"/"}>
        <a className={`hover:text-cyan-500 p-5`}>Главная</a>
      </Link>
      <div className={`flex justify-center pt-10`}>
        <form
          className={`flex flex-col max-w-sm`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="username">Логин</label>
          <input
            className="text-black mb-5"
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label htmlFor="password">Пароль</label>
          <input
            className="text-black"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            className={`mt-10 mx-auto w-20 h-10 text-center bg-zinc-900 hover:text-cyan-500 hover:bg-[#111111]`}
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
