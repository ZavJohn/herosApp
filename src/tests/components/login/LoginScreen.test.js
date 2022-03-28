import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Se probara el <LoginScreen />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };
    
    const wrapper = mount(

        <AuthContext.Provider value= { contextValue }>
            <MemoryRouter initialEntries={[ '/' ]}>
                <Routes>
                    <Route path="/" element={ <LoginScreen /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>

    );
    
    test('Debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.btn-primary').text().trim() ).toBe('Login');
    });

    test('debe realizar el dispatch y la navegación', () => { 

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({ 
            type: types.login,
            payload: { name: 'Jonathan' }
         })

        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', { replace: true });
        localStorage.setItem('lastPath', '/marvel');

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });


     });
})