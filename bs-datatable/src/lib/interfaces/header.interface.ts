import {HeaderTypeEnum} from "../enums/header-type.enum";

export interface IHeader {
    title: string;
    key: string;
    hidden?: boolean;
    sortable?: boolean;
    sortKey?: string;
    className?: string;
}
