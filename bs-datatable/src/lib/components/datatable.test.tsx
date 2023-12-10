import {render, screen } from "@testing-library/react";
import Datatable from "./Datatable";
import {BS_HEADERS} from "../../mock/bs-datatable/header/headers";
import {items} from "../../mock/bs-datatable/data/data";
import clearAllMocks = jest.clearAllMocks;

describe('Datatable', () => {
    it('should render children', () => {
        render(<Datatable
            headers={[]}
            items={[]}>
            <thead><tr><th>test</th></tr></thead>
        </Datatable>);

        const element = screen.getByText(/test/i);

        expect(element).toBeInTheDocument();
    });

    it('should render with mock data', () => {
        render(<Datatable
            headers={BS_HEADERS}
            items={items}/>);

        const element = screen.getByText(/dculleford1d@narod.ru/i);

        expect(element).toBeInTheDocument();
    });

    it('should render default loading element', () => {
        render(<Datatable
            headers={[]}
            items={[]}
            loading={true}
        />);

        const element = screen.getByText(/loading/i);

        expect(element).toBeInTheDocument();
    });

    it('should render default empty-state element', () => {
        render(<Datatable
            headers={[]}
            items={[]}
        />);

        const element = screen.getByText(/there is no data!/i);

        expect(element).toBeInTheDocument();
    });
});
