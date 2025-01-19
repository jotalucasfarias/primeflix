// Importação dos hooks useEffect e useState do React
import { useEffect, useState } from "react";
// Importação da instância api para fazer requisições HTTP
import api from "../../services/api";
// Importação do componente Link do React Router Dom
import { Link } from 'react-router-dom';
// Importação do arquivo de estilo CSS
import "./home.css";

import { OrbitProgress } from "react-loading-indicators";

// URL DA API: movie/now_playing?api_key=4ba4550f6b37ec6f9db76d5de9c9b18a&language=pt-BR

function Home() {
  // Declaração do estado filmes com um array vazio inicial
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função assíncrona para carregar os filmes da API
    async function loadFilmes() {
      // Faz uma solicitação GET para o endpoint "movie/now_playing" com a chave de API e o idioma
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "4ba4550f6b37ec6f9db76d5de9c9b18a",
          language: "pt-BR",
          page: 1,
        }
      });

      // Atualiza o estado filmes com os 10 primeiros resultados da resposta da API
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    // Chama a função loadFilmes quando o componente é montado
    loadFilmes();
  }, []);


  if (loading) {
    return (
      <div className="loading">
        <OrbitProgress variant="disc" color="#2749bb" size="medium" text="" textColor="" />
        <h1>Carregando filmes...</h1>
      </div>
    )  // Loading state aqui, exibe um texto indicando que o componente está carregando os filmes.

  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            // Cria um artigo para cada filme com um título, imagem e link para detalhes
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// Exportação do componente Home
export default Home;
