import React from 'react'
import { Link } from 'react-router-dom'

const URL_IMAGEM = 'https://image.tmdb.org/t/p/w500' //URL base do filme

// import { Container } from './styles';

function Filme({ filme }) {
  return (
    <Link to={'/filme/' + filme.id} className="gridItem" key={filme.id}>
      {/* `/filme/${filme.id}` interpolação de strings */}
      <h3>{filme.title}</h3>
      <p>Data de lançamento: {filme.release_date}</p>
      <img src={URL_IMAGEM + filme.backdrop_path} alt="Imagem do filme"></img>
    </Link>
  )
}

export default Filme
