import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme-info.css';
function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '4ba4550f6b37ec6f9db76d5de9c9b18a',
            language: 'pt-BR',
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log('Filme não encontrado');
          navigate('/', { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO');
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeFlix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id,
    );

    if (hasFilme) {
      toast.error('Este filme já está em sua lista de favoritos!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
    toast.success('Filme adicionado à sua lista de favoritos!');
  }

  if (loading) {
    return (
      <div className="loading-container">
        <OrbitProgress
          variant="disc"
          color="#2749bb"
          size="medium"
          text=""
          textColor=""
        />
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-container">
      <div className="filme-info">
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
          alt={filme.title}
        />
        <div className="filme-details">
          <h1>{filme.title}</h1>
          <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

          <h3>Sinopse</h3>
          <span>{filme.overview || 'Sinopse não disponível.'}</span>

          <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar nos Favoritos</button>
            <a
              target="blank"
              rel="external noreferrer"
              href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
            >
              Ver Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
