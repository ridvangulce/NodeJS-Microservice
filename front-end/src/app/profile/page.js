"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import withAuth from "../../../lib/withAuth";
import LogoutButton from "@/components/LogOutButton";
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token eksik. Giriş yapmanız gerekiyor."); // Eksik token
        setError("Token eksik.");
        return;
      }

      try {
        console.log("Token ile profil isteği gönderiliyor:", token);
        const response = await API.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profil yanıtı:", response.data); // API yanıtını logla
        setProfile(response.data);
      } catch (err) {
        console.error(
          "Profil isteği hatası:",
          err.response?.data || err.message
        ); // API hatasını logla
        setError("Profil bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profil</h1>
      {profile && (
        <ul>
          <li>Ad Soyad: {profile.nameSurname}</li>
          <li>Email: {profile.email}</li>
          <li>Kullanıcı Adı: {profile.username}</li>
        </ul>
      )}
      <LogoutButton />
    </div>
  );
};

export default withAuth(ProfilePage);
