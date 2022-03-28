
import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/NavBar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en el <NavBar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Peter',
            logged: true
        }
    };
    
    const wrapper = mount(
        <AuthContext.Provider value= { contextValue }>
            <MemoryRouter initialEntries={[ '/' ]}>
                <Routes>
                    <Route path="/" element={ <Navbar /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    
    test('Debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Peter');

    });

    test('Acción al Logout y dispatch con los argumentos', () => {

        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({ 'type': types.logout })
        expect( mockNavigate ).toHaveBeenCalledWith('/login', { replace: true });

    });
})