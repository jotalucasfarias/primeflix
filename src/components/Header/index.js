import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header>
      <div className="header-content">
        <Link className="logo" to={'/'}>
          Prime Flix
        </Link>
        <Link className="favoritos" to={'/favoritos'}>
          Meus Filmes
        </Link>
      </div>
    </header>
  );
}

export default Header;
