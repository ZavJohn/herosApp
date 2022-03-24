import React, { useMemo }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import querytString from 'query-string';
import { getHeroByName } from '../../helpers/getHeroByName';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
  
 const navigate = useNavigate();
 const location = useLocation();

const { q = ''} = querytString.parse(location.search);
 
  const [ formValues, handleInputChange, reset ] = useForm({
   searchText: q,
 });

 const { searchText } = formValues;

 const heroesFilter = useMemo( getHeroByName(q), [ q ] );
 
 const handleSearch = (e) => {
    e.preventDefault();

    navigate(`?q=${ searchText }`);

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
              (q==='')
                ? <div className="alert alert-info">No se ingresaron criterioz de búsqueda</div>
                    : ( heroesFilter.length === 0 ) 
                        && <div className="alert alert-danger">No se encontraron resultados en: { q }</div>
            }
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
