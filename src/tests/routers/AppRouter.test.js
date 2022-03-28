import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from "../../routers/AppRouter";


describe('Pruebas en el AppRouter', () => {

    const contextValue = {
        user: {
            logged: false
        }
    };
    
    test('Debe mostrar el marvel si esta autenticado', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'John'
            }
        };
        
        const wrapper = mount(
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists ).toBeTruthy();

    });

    test('Debe mostrar el login si no está autenticado', () => {
        
        const wrapper = mount(
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' )

    });

})