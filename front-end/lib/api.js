import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchUsers = async () => {
  const response = await API.get("/api/users");
  return response.data;
};

export const loginUser = async (credentials) => {
    console.log('Giriş isteği gönderiliyor:', credentials);
  
    try {
      const response = await API.post('/api/auth/login', credentials);
      console.log('Giriş isteği yanıtı:', response.data);
      return response.data;
    } catch (error) {
      console.error('Giriş isteği sırasında hata:', error.response?.data || error.message);
      throw error.response?.data || new Error('Giriş başarısız');
    }
  };
  

export default API;
