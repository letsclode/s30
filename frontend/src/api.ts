import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUsers = async (role?: string) => {
  const url = role ? `${API_BASE_URL}/users?role=${role}` : `${API_BASE_URL}/users`;
  const response = await axios.get(url);
  return response.data;
};

export const createUser = async (data: { name: string; email: string; roles: string[] }) => {
  const response = await axios.post(`${API_BASE_URL}/users`, data);
  return response.data;
};
