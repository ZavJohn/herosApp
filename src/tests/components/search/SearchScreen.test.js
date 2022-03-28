import { mount } from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
describe('Pruebas en el <SearchScreen />', () => {
    
    test('Debe mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search' ]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('No se ingresaron criterios de búsqueda');
    });

    test('Debe mostrar a Batman y el input con el queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
    
    });

    test('Debe mostrar mensaje de alerta por busqueda erronea', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=123' ]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No se encontraron resultados en: 123');
    
    });

    test('Acción del submit', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/search?q=123' ]}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'hulk'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        
        expect( mockNavigate ).toHaveBeenCalledWith('?q=hulk');
        //expect( wrapper.find('.alert-danger').text().trim() ).toBe('No se encontraron resultados en: 123');
    
    });

})