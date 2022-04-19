import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//Botão
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { autocompleteClasses, Box } from '@mui/material'
//Card
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const URL_IMAGEM = 'https://image.tmdb.org/t/p/w500' //URL base do filme

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default function Home() {
  const [generos, setGeneros] = useState([]) //botões - traz os generos
  const [filmes, setFilmes] = useState([]) // TODOS filmes

  const [filmesEscolhidos, setFilmesEscolhidos] = useState([])
  const [generosSelecionados, setGenerosSelecionados] = useState([]) // traz os generos (clicados)filtrados

  useEffect(() => {
    async function pegandoGenerosDaAPI() {
      const resposta = await api.get(
        '/genre/movie/list?api_key=733579df3282a4fce2a7adbb959d62ac'
      )

      setGeneros(resposta.data.genres)
    }

    async function pegandoFilmesDaAPI() {
      const resposta = await api.get(
        'movie/popular?api_key=733579df3282a4fce2a7adbb959d62ac'
      )
      setFilmes(resposta.data.results)
      setFilmesEscolhidos(resposta.data.results)
    }

    pegandoGenerosDaAPI()
    pegandoFilmesDaAPI()
  }, [])

  useEffect(() => {
    console.log(generosSelecionados)
    if (generosSelecionados.length === 0 && filmes.length) {
      //retorna vazio

      setFilmesEscolhidos(filmes)
      return // para a função
    }
    const filmesFiltrados = filmes.filter(filme => {
      for (const generoID of generosSelecionados) {
        if (filme.genre_ids.includes(generoID)) {
          return true
        }
        /*
        // se quiser que tenha todos os generos selecionados
        else {
          return false;
        } */
      }
      return false
    })
    setFilmesEscolhidos(filmesFiltrados)
  }, [generosSelecionados])

  /*
  // busca por 1 gênero só
  const selecionaFilmesPorGenero = genero => {
    const generoID = genero.id;

    const filmesFiltrados = filmes.filter(filme => {
      return filme.genre_ids.includes(generoID);
    });
  }
  */
  const selecionaFilmesPorGenero = genero => {
    // [...generosSelecionados]
    const generoID = genero.id

    // const novosGeneros = Array.from(generosSelecionados)
    const novosGeneros = [...generosSelecionados]
    console.log(novosGeneros)
    if (novosGeneros.includes(generoID)) {
      // já tem
      // retira do array - desmarca o botão
      const index = novosGeneros.indexOf(generoID)
      novosGeneros.splice(index, 1)
    } else {
      novosGeneros.push(generoID) // marca
    }

    setGenerosSelecionados(novosGeneros)
  }

  return (
    <>
      <Box
        fullWidth
        sx={{
          backgroundColor: 'rgba(92, 22, 197, 1)',
          height: 30
        }}
      >
        <Typography
          sx={{
            paddingLeft: '1rem'
          }}
          color="white"
        >
          TMDB
        </Typography>{' '}
      </Box>

      <div>
        <Box
          sx={{
            width: '100%',
            height: 270,
            backgroundColor: 'rgba(45, 12, 94, 1)',
            textAlign: 'center'
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              paddingTop: '1rem'
            }}
            color="white"
          >
            Milhões de filmes, séries e pessoas para descobrir. <br /> Explore
            já.{' '}
          </Typography>
          <br />

          <Typography
            sx={{
              textAlign: 'center'
            }}
            color="white"
          >
            {' '}
            <p> Filtre por: </p>
          </Typography>
          {generos.map(genero => (
            <Button
              variant="outlined"
              size="small"
              sx={{
                marginRight: '8px',
                marginTop: '15px',
                backgroundColor: 'white'
              }}
              key={genero.id}
              onClick={() => selecionaFilmesPorGenero(genero)}
            >
              {genero.name}
            </Button>
          ))}
        </Box>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          width: 'auto',
          height: '100%',
          background: ' rgba(234, 226, 226, 0.8)',
          paddingLeft: '1rem'
        }}
      >
        {filmesEscolhidos.map(filme => (
          <Link to={'/filme/' + filme.id} key={filmes.id}>
            <h3 style={{ marginTop: '1rem' }}>{filme.title}</h3>
            <p>Data de lançamento: {filme.release_date}</p>
            <img
              style={{
                width: '95%',
                marginTop: '2rem'
              }}
              src={URL_IMAGEM + filme.backdrop_path}
              alt="Imagem do filme"
            ></img>
          </Link>
        ))}
      </div>
      {/* {filmesEscolhidos.map(filme => (
          <Filme filme={filme} />
        ))} */}
    </>
  )
}
