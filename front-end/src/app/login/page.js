"use client";

import { useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";
import withNoAuth from "../../../lib/withNoAuth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await API.post("/api/auth/login", { login, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Başarıyla giriş yapıldı!");
      router.push("/profile");
    } catch (error) {
      console.error("Giriş hatası:", error.response?.data || error.message);
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Giriş Yap</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email veya Kullanıcı Adı"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default withNoAuth(LoginPage);
