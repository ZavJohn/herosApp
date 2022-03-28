import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';


describe('Pruebas en el DashboardRoutes', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Petronilo'
        }
    };
    
    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Petronilo');
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');
    });

    test('Debe mostrarse correctamente DC', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[ '/DC' ]}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Dc Screen');
    });
})