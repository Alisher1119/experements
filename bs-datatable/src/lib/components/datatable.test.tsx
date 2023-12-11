import {act, getAllByRole, queryByAttribute, render, screen} from "@testing-library/react";
import Datatable from "./Datatable";
import {BS_HEADERS} from "../../mock/bs-datatable/header/headers";
import {items} from "../../mock/bs-datatable/data/data";
import userEvent from "@testing-library/user-event";

describe('Datatable', () => {
    it('should render children', () => {
        render(<Datatable
            headers={[]}
            items={[]}>
            <thead>
            <tr>
                <th>test</th>
            </tr>
            </thead>
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

    it('should render with checkboxes', () => {
        const {getAllByRole} = render(<Datatable
            headers={BS_HEADERS}
            items={items}
            hasCheckbox={true}
        />);

        const elements = getAllByRole('checkbox');
        elements.forEach(element => {
            expect(element).toBeInTheDocument();
        })
    });

    it('should select all items', async () => {
        const getById = queryByAttribute.bind(null, 'id');
        let selectedItems: any[] = [];
        const {container} = render(<Datatable
            headers={BS_HEADERS}
            items={items}
            hasCheckbox={true}
            onItemsSelected={(selectItems: any[]) => {
                selectedItems = selectItems
            }}
        />);

        const checkbox = getById(container, 'select-all');

        if (checkbox) {
            expect(checkbox).not.toBeChecked();

            await act(async () => {
                if (checkbox) {
                    await userEvent.click(checkbox);
                }
            });

            expect(checkbox).toBeChecked();
            expect(selectedItems.length === items.length).toBeTruthy();
        }
    });

    it('should return clicked row item', async () => {
        let selectedItem: any;
        const {getAllByRole} = render(<Datatable
            headers={BS_HEADERS}
            items={items}
            hasCheckbox={true}
            onRowClick={(item: any) => {
                selectedItem = item;
            }}
        />);

        const elements = getAllByRole('row');
        elements.splice(0, 1);

        elements.forEach((element, index: number) => {
            userEvent.click(element);
            expect(selectedItem.id === index + 1).toBeTruthy();
        })
    });
});
