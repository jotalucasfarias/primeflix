import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
import { OrbitProgress } from "react-loading-indicators";
import { toast } from "react-toastify";
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
            api_key: "4ba4550f6b37ec6f9db76d5de9c9b18a",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      // Limpa o estado assim que a página é desmontada
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.error("Este filme já está em sua lista de favoritos!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme adicionado à sua lista de favoritos!");
  }

  if (loading) {
    return (
      <div className="filme-info">
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
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external noreferrer"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
