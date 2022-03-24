import React  from 'react';
import { getHeroByName } from '../../helpers/getHeroByName';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
  
 const [ formValues, handleInputChange, reset ] = useForm({
   searchText: '',
 });

 const { searchText } = formValues;

 const heroesFilter = getHeroByName()
 
 const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
        <h1>Búsquedas</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Buscar</h4>
            <hr />

            <form className="row" onSubmit={ handleSearch }>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Ingresa tu búsqueda"
                  className="form-control"
                  name="searchText"
                  autoComplete="off"
                  value={ searchText }
                  onChange={ handleInputChange }
                />

                <button
                  className="input-group-text btn-secondary"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>

          <div className="col-7">
            <h4>Resultados</h4>
            <hr />

            {
              heroesFilter.map(hero =>(
                  <HeroCard 
                    key={ hero.id }
                    { ...hero }
                  />
              ))

            }

          </div>  
        </div>
    </> 
  )
}
