import {IHeader} from "../../../bs-datatable/src/lib/interfaces/header.interface";
import {HeaderTypeEnum} from "../../../bs-datatable/src/lib/enums/header-type.enum";

export const BS_HEADERS: IHeader[] = [
    {
        title: 'ID',
        type: HeaderTypeEnum.text,
        key: 'id',
        sortable: false,
    },
    {
        title: 'Name',
        type: HeaderTypeEnum.text,
        key: 'name',
        sortKey: 'name',
        sortable: true,
    },
    {
        title: 'Username',
        type: HeaderTypeEnum.text,
        key: 'username',
        sortKey: 'username',
        sortable: true,
    },
    {
        title: 'Email',
        type: HeaderTypeEnum.text,
        key: 'email',
        sortKey: 'email',
        sortable: true,
    },
    {
        title: 'Phone',
        type: HeaderTypeEnum.text,
        key: 'phone',
        sortKey: 'phone',
        sortable: true,
    }
];
