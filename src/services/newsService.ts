import { News } from '../interfaces';
import axios from 'axios';

export async function addNews(data: News) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/news`;

    const { data: result } = await axios.post(url, data);

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function editNews(id: News['id'], data: News) {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/news/${id}`;
  
      const { data: result } = await axios.put(url, data);
  
      return result;
    } catch (error) {
      console.log(error);
    }
  }

export async function getNews() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/news`;
    const { data: result } = await axios.get(url);

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNews(id: News['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/news/${id}`;
    const { data: result } = await axios.delete(url);

    return result;
  } catch (error) {
    console.log(error);
  }
}
