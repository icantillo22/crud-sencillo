import { useNavigate } from "react-router-dom"

export default function ErrorPage() {

  const navigate = useNavigate();

  return (
    <div className="container" id="error-page">
      <div className="row">
        <div className="col text-center">
          <h1>Oops!</h1>
          <p>Al parecer la pagina a la que intentas acceder no existe...</p>                    
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          > 
            Regresar 
          </button>
        </div>
      </div>
    </div>
  );
}