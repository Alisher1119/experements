import {IHeader} from "./header.interface";

export interface IDatatable {
    headers: IHeader[];
    items: any[];

    hasIndexNumbers?: boolean;
    hasCheckbox?: boolean;
    loading?: boolean;

    emptyStateComponent?: any;
    loaderComponent?: any;

    onChange?: () => {},
    onHeaderChange?: (header: IHeader, index: number) => {},
    onSort?: (sortFields: any) => {},
    onRowClick?: (item: any) => {},
}
