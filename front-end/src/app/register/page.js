"use client";

import { useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nameSurname: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/user", formData);
      toast.success("Başarıyla kayıt olundu!");
      router.push("/login");
    } catch (error) {
      console.error("Kayıt hatası:", error.response?.data || error.message);

      if (error.response?.data?.errors) {
        // Backend'den dönen hata mesajlarını tek tek göster
        error.response.data.errors.forEach((err) => {
          toast.error(err);
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Kayıt başarısız, lütfen bilgilerinizi kontrol edin!"
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>

        <div className="mb-4">
          <input
            type="text"
            name="nameSurname"
            value={formData.nameSurname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Ad Soyad"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Kullanıcı Adı"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="E-posta"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Şifre"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Kayıt Ol
        </button>

        <p className="mt-4 text-center text-sm">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Giriş Yap
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
