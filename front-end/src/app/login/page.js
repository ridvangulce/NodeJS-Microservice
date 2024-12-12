"use client";

import { useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";
import withNoAuth from "../../../lib/withNoAuth";
import { toast } from "react-toastify"; // React-Toastify import edildi
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS dosyası

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/auth/login", { login, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Başarıyla giriş yapıldı!");
      router.push("/profile");
    } catch (error) {
      console.error("Giriş hatası:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Giriş başarısız, tekrar deneyin!"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>

        <div className="mb-4">
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Email veya Kullanıcı Adı"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Şifre"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Giriş Yap
        </button>

        <p className="mt-4 text-center text-sm">
          Henüz hesabınız yok mu?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Kayıt Ol
          </a>
        </p>
      </form>
    </div>
  );
};

export default withNoAuth(LoginPage);
