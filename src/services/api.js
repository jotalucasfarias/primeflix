//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=******************&language=pt-BR

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'pt-BR',
  },
});

export default api;
