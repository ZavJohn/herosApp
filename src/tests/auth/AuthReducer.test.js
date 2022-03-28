import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {
    
    test('Debe retornar el estado por defecto', () => {
        
        const state = authReducer({ logged: false }, {});

        expect( state ).toEqual({ logged: false });

    });

    test('Debe autenticar y colocar el nombre del usuario', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Jonathan'
            }
        };

        const state = authReducer({ logged: true }, action );

        expect( state ).toEqual({ 
            logged: true,
            name: 'Jonathan'
         });

    });

    test('Debe borrar el nombre del usuario y el logged en false', () => {
        
        const action = { type: types.logout };

        const state = authReducer({ logged: true }, action );
        expect( state ).toEqual({ logged: false });

    });
})