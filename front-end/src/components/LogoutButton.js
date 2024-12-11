"use client";

import { useRouter } from 'next/navigation';
import API from '../../lib/api';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token bulunamadı, zaten çıkış yapılmış.');
      router.push('/login');
      return;
    }

    try {
      // Backend'e logout isteği gönder
      await API.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Token'ı localStorage'dan sil
      localStorage.removeItem('token');
      alert('Başarıyla çıkış yapıldı.');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      alert('Çıkış sırasında bir hata oluştu.');
    }
  };

  return <button onClick={handleLogout}>Çıkış Yap</button>;
};

export default LogoutButton;
