import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

  const [isLoading, setIsLoading] = useState(false);  
  const [listPersonajes, setListPersonajes] = useState([])
  const [btnData, setBtnData] = useState({ next: '', previus: '' })

  const getDataApi = async (url) => {
    setIsLoading(true)
    const req = await fetch( !url ? 'https://rickandmortyapi.com/api/character' : url);
    const res = await req.json()
    setIsLoading(false)

    setBtnData({
      next: res.info?.next,
      previus: res.info?.prev,
    })
    setListPersonajes(res.results)
  }

  useEffect(() => {
    ( async () => {
      await getDataApi()
    })()
  }, [])

  if ( isLoading ) {
    return (
      <div className='container'>
        <div className='row mt-5'>
        <div className='col text-center'>
          <h1> Personajes rick and morty </h1>
        </div>
      </div>
        <div className='row  mt-5'>
          <div className='col text-center'>
            <h4>Cargando...</h4>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col text-center'>
          <h1> Personajes rick and morty </h1>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col d-flex justify-content-between'>
          <Link className='btn btn-primary mr-1 mb-2' to="/">Volver</Link>
          <div>
            <button className={`btn btn-primary mr-1 mb-2`} onClick={ () => getDataApi( btnData.previus ) }>Anterior</button>
            <button className={`btn btn-primary ml-1 mb-2`} onClick={ () => getDataApi( btnData.next ) }>Siguiente</button>
          </div>
        </div>
      </div>
      <div className='row'>
        {
          listPersonajes.map( character => (
            <div key={ character.id } className='col mx-auto'>
              <div className="card my-2" style={{width: "18rem"}}>
                <img src={ character.image } className="card-img-top" alt={ character.name } />
                <div className="card-body">
                  <h5 className="card-title">{ character.name }</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <span className="btn btn-primary">Go somewhere</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}