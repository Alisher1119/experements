import {act, queryByAttribute, render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {Datatable} from "./index";
import {BS_HEADERS} from "./mock/bs-datatable/header/headers";
import userEvent from "@testing-library/user-event";
import {items} from "./mock/bs-datatable/data/data";
import * as React from "react";

describe('Datatable', () => {
    it('should render children', () => {
        const {getByText} = render(<Datatable
            headers={[]}
            items={[]}>
            <thead>
            <tr>
                <th>test</th>
            </tr>
            </thead>
        </Datatable>);

        const element = getByText(/test/i);

        expect(element).toBeInTheDocument();
    });

    it('should render with mock data', () => {
        const {getByText} = render(<Datatable
            headers={BS_HEADERS}
            items={items}/>);

        const element = getByText(/dculleford1d@narod.ru/i);

        expect(element).toBeInTheDocument();
    });

    it('should render default loading element', () => {
        const {getByText} = render(<Datatable
            headers={[]}
            items={[]}
            loading={true}
        />);

        const element = getByText(/loading/i);

        expect(element).toBeInTheDocument();
    });

    it('should render default empty-state element', () => {
        const {getByText} = render(<Datatable
            headers={[]}
            items={[]}
        />);

        const element = getByText(/there is no data!/i);

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
