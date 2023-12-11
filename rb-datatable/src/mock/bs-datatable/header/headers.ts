import {IHeader} from "../../../lib/interfaces/header.interface";

export const BS_HEADERS: IHeader[] = [
    {
        title: 'ID',
        key: 'id',
        sortable: false,
    },
    {
        title: 'Name',
        key: 'name',
        sortKey: 'name',
        sortable: true,
    },
    {
        title: 'Username',
        key: 'username',
        sortKey: 'username',
        sortable: true,
    },
    {
        title: 'Email',
        key: 'email',
        sortKey: 'email',
        sortable: true,
    },
    {
        title: 'Phone',
        key: 'phone',
        sortKey: 'phone',
        sortable: true,
    }
];
