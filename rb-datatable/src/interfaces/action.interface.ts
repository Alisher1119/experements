import {ActionTypeEnum} from "../enums/action-type.enum";

export interface IAction {
    title: string;
    variant: string;
    icon?: string;
    type?: ActionTypeEnum,
    action: (data: any) => {}
}
