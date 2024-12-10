"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../lib/api";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ login, password });
      setMessage("Giriş başarılı!");
      localStorage.setItem("token", data.token); // JWT'yi localStorage'da sakla
      router.push("/users"); // Başarılı giriş sonrası kullanıcı listesine yönlendir
    } catch (error) {
      setMessage("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div>
      <h1>Giriş Yap</h1>
      <form onSubmit={handleLogin}>
        <input
          type="login"
          placeholder="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="current-login" // Buraya eklendi
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" // Buraya eklendi
        />
        <button type="submit">Giriş Yap</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
