"use client";

import { useState } from 'react';
import API from '../../../lib/api';
import { useRouter } from 'next/navigation';
import withNoAuth from '../../../lib/withNoAuth';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await API.post('/api/auth/login', { login, password });
      localStorage.setItem('token', response.data.token);
      alert('Başarıyla giriş yapıldı!');
      router.push('/profile'); // Başarılı giriş sonrası profile yönlendir
    } catch (error) {
      console.error('Giriş hatası:', error.response?.data || error.message);
      alert('Giriş başarısız.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
      <h1>Giriş Yap</h1>
      <input
        type="text"
        placeholder="Email veya Kullanıcı Adı"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
};

export default withNoAuth(LoginPage);
