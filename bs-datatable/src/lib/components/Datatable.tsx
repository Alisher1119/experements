import {IDatatable} from "../interfaces/datatable.interface";
import {get, isEmpty} from "lodash";
import {IHeader} from "../interfaces/header.interface";
import {IAction} from "../interfaces/action.interface";
import {FormCheck, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useEffect, useState} from "react";

export const Datatable = ({
                              headers = [],
                              actions = [],
                              items = [],
                              page = 1,
                              className = '',
                              rowClasses = '',
                              rowStyles = {},
                              hasCheckbox = false,
                              hasIndexNumbers = true,
                              loading = false,
                              loaderComponent = <div>Loading ...</div>,
                              emptyStateComponent = <div>There is no data!</div>,
                              onRowClick = (item: any): any => {
                              },
                              onItemsSelected = (items: any[]): any => {
                              },
                              ...props
                          }: IDatatable) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (selectedItems.length === items.length) {
            setChecked(true);
        } else {
            setChecked(false);
        }
        onItemsSelected(selectedItems);
    }, [JSON.stringify(selectedItems)]);

    const selectAll = ($e: any) => {
        const checked = get($e, 'target.checked');
        if (checked) {
            setSelectedItems(items);
        } else {
            setSelectedItems([]);
        }
    }

    const selectOne = ($e: any, item: any) => {
        const checked = get($e, 'target.checked');
        let tmpSelectedItems = [...selectedItems];
        if (checked) {
            tmpSelectedItems.push(item);
        } else {
            tmpSelectedItems = tmpSelectedItems.filter(selectedItem => JSON.stringify(selectedItem) !== JSON.stringify(item));
        }
        setSelectedItems(tmpSelectedItems);
    }
    return <>{get(props, 'children') ? <div className="table-responsive">
        <table className={`${className}`}>
            {get(props, 'children')}
        </table>
    </div> : !loading ? <>
        {!isEmpty(items) ? <>
            <div className="table-responsive">
                <table className={`${className}`}>
                    <thead>
                    <tr>
                        {hasIndexNumbers && <th style={{width: 35}}>#</th>}
                        {hasCheckbox && <th
                            style={{width: '20px'}}>
                            <FormCheck onChange={selectAll} checked={checked}/>
                        </th>}
                        {headers
                            .filter(({hidden}: any) => !hidden)
                            .map((header: IHeader, index: number) => <th
                                key={index}
                                className={`fw-normal fw-bold ${header.className}`}>
                                {get(header, 'title')}
                            </th>)}
                        {!isEmpty(actions) && <th></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item: any, idx: number) => <tr
                        key={idx}
                        className={`${rowClasses}`}
                        style={rowStyles} onClick={() => onRowClick(item)}>
                        {hasIndexNumbers && <td>{(page - 1) * get(items, 'length', 0) + idx + 1}</td>}
                        {hasCheckbox && <td>
                            <FormCheck
                                checked={selectedItems.some(selectedItem => JSON.stringify(selectedItem) === JSON.stringify(item))}
                                onChange={($e: any) => selectOne($e, item)}
                            />
                        </td>}
                        {headers.filter(({hidden}: any) => !hidden).map((header: IHeader, index: number) =>
                            <td key={index}>
                                {get(item, get(header, 'key'))}
                            </td>)}
                        {!isEmpty(actions) && <td>
                            {actions.map((btn: IAction, index: number) =>
                                <OverlayTrigger key={`${idx}-${index}`} placement="top"
                                                overlay={<Tooltip>{btn.title}</Tooltip>}>
                                    <a className={`text-${btn.variant} ms-1`}
                                       onClick={($e: any) => {
                                           $e.stopPropagation();
                                           btn.action(item);
                                       }}>
                                        <i className={`tx-${btn.variant} ${btn.iconClass}`}></i>
                                    </a></OverlayTrigger>)}
                        </td>}
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </> : <>{emptyStateComponent}</>}
    </> : <>{loaderComponent}</>}
    </>
}

export default Datatable;



