
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../src/styles/Appstyles.css'
function App() {
const [arraysPokemon, setarraysPokemon] =useState([])
const [proximapagePokemon, setProximapagePokemon] = useState({})
const [previouspagePokemon, setPreviouspagePokemon] = useState({})

  const loadPokemon = async(url = null)=>{
  try {
    const response = await axios.get(url)
    const pokemonData = response.data

    setarraysPokemon(pokemonData.results)
    setProximapagePokemon(pokemonData.next)
    setPreviouspagePokemon(pokemonData.previous)
  } catch (error) {
    console.log(error)
  }
  }

  useEffect(()=>{
    loadPokemon('https://pokeapi.co/api/v2/pokemon')
  },[])

  const handlePreviousPage=()=>{
    if(previouspagePokemon){
      loadPokemon(previouspagePokemon)
    }
  }


  const handleProximaPage = ()=>{
if(proximapagePokemon)
loadPokemon(proximapagePokemon)
  }

  return(
<>
<main>
  <h1>Refatorando Pokemons</h1>
  {arraysPokemon.map((pokemon)=>
  <article key={pokemon.name}  >
    <strong>{pokemon.name}</strong>
  </article>
  )}
  <div className='button'>
    <button className="previous"onClick={handlePreviousPage}  disabled={!handlePreviousPage}>Voltar
    </button>
    <button className='proxima' onClick={handleProximaPage}  disabled={!handleProximaPage}> 
    Proximo
    </button>
  </div>
</main>
</>
  )
}

export default App;