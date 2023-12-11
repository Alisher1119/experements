import {IHeader} from "./header.interface";
import {IAction} from "./action.interface";

export interface IDatatable {
    children?: any;
    headers: IHeader[];
    items: any[];
    actions?: IAction[];

    page?: number;
    limit?: number;

    hasIndexNumbers?: boolean;
    hasCheckbox?: boolean;
    loading?: boolean;

    className?: string;
    rowClasses?: string;
    rowStyles?: object;

    emptyStateComponent?: any;
    loaderComponent?: any;

    // onSort?: (sortFields: any) => {},
    onRowClick?: (item: any) => void;
    onItemsSelected?: (items: any[]) => void;
}
