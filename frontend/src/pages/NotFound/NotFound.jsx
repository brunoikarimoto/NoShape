import "./NotFound.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <h4>Está página que você quer acessar não existe!</h4>
      <Link to="/" className="voltar">
        Voltar
      </Link>
    </div>
  );
};

export default NotFound;
