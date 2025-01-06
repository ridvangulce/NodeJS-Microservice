"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import withAuth from "../../../lib/withAuth";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        toast.error("Profil bilgileri alınamadı. Lütfen tekrar deneyin!");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p>Yükleniyor...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Başarıyla çıkış yapıldı!");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Kullanıcı Profili</h1>
        <p className="mb-2">
          <strong>Ad Soyad:</strong> {user.nameSurname}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
