import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get('movie/now_playing', {
          params: {
            page: 1,
          },
        });
        setFilmes(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Falha ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

  if (loading) {
    const skeletonItems = Array.from({ length: 10 }, (_, index) => (
      <article key={index} className="skeleton-card"></article>
    ));

    return (
      <div className="container">
        <h1 className="page-title">Filmes em Cartaz</h1>
        <div className="lista-filmes">{skeletonItems}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Filmes em Cartaz</h1>
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}></Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
