import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('@primeFlix');
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
    toast.success('Filme excluído com sucesso!');
  }

  return (
    <div className="favoritos-container">
      <h1 className="page-title">Meus Filmes Favoritos</h1>
      {filmes.length === 0 && (
        <span className="lista-vazia">Você ainda não salvou nenhum filme!</span>
      )}
      <div className="favoritos-grid">
        {filmes.map((item) => {
          return (
            <article key={item.id} className="favorito-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
              />
              <div className="card-content">
                <strong>{item.title}</strong>
                <div className="card-actions">
                  <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                  <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Favoritos;
