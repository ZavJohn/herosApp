import { heroes } from "../data/heros";


export const getHeroById = ( id ) => {
    return heroes.filter( hero => hero.id === id );
};