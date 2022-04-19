import { Box, Typography } from '@mui/material'
import { color } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Sinopse = () => {
  const { filmeId } = useParams()
  const [genres, setGenres] = useState([])
  const [filme, setFilme] = useState({})

  console.log(filmeId)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filmeId}?api_key=733579df3282a4fce2a7adbb959d62ac#`
    ).then(async response => {
      const data = await response.json()

      const { genres } = data

      console.log(data)
      setGenres(genres)
      setFilme(data)
    })
  }, [])
  const poster = 'https://image.tmdb.org/t/p/w500' //URL base
  return (
    <>
      <Box
        fullWidth
        sx={{
          backgroundColor: 'rgba(92, 22, 197, 1)',
          height: 30
        }}
      >
        <Typography sx={{ paddingLeft: '1rem' }} color="white">
          {' '}
          TMDB{' '}
        </Typography>
      </Box>

      <div>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: 'rgba(45, 12, 94, 1)',
            textAlign: 'center',
            color: 'white'
          }}
        >
          {' '}
          <h1>{filme.original_title}</h1>
          <br />
          <h4>
            Data de Lançamento: {filme.release_date}
            <br />
            Tempo estimado: {filme.runtime} minutos.
          </h4>
          <br />
          <h3>Avaliação do usuário: {filme.vote_average}</h3>
          <br />
          {genres.map((genre, key) => (
            <h4 key={key}>{genre.name}</h4>
          ))}
          <br />
          <p>
            {' '}
            <b>Resume: </b> {filme.overview}
          </p>
          <br />
        </Box>
        <div
          style={{
            background: 'rgba(92, 22, 197, 1)'
          }}
        >
          <img
            style={{ width: '20%', height: '20%', paddingLeft: '35rem' }}
            src={poster + filme.poster_path}
            alt=""
          ></img>
        </div>
      </div>
    </>
  )
}
export default Sinopse
