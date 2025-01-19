//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=4ba4550f6b37ec6f9db76d5de9c9b18a&language=pt-BR

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '4ba4550f6b37ec6f9db76d5de9c9b18a',
    language: 'pt-BR'
  }
})

export default api;