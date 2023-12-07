import {ActionTypeEnum} from "../enums/action-type.enum";

export interface IAction {
    title: string;
    key: string;
    variant: string;
    iconClass?: string;
    type?: ActionTypeEnum
}
