import {HeaderTypeEnum} from "../enums/header-type.enum";

export interface IHeader {
    title: string;
    key: string;
    enabled: boolean;
    hidden?: boolean;
    sortable?: boolean;
    sortKey?: boolean;
    type?: HeaderTypeEnum;
}
