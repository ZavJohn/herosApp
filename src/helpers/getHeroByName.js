import { heroes } from "../data/heros";


export const getHeroByName = ( name = '' ) => {

    name = name.toLowerCase();
    return heroes.filter( hero => hero.superhero.toLowerCase().includes(name));
};