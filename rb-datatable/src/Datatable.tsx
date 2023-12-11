import {IDatatable} from "./interfaces/datatable.interface";
import {IHeader} from "./interfaces/header.interface";
import {IAction} from "./interfaces/action.interface";
import {FormCheck, OverlayTrigger, Tooltip} from "react-bootstrap"
import { useEffect, useState} from "react";
import * as React from 'react';

export const Datatable = ({
                            headers = [],
                            actions = [],
                            items = [],
                            page = 1,
                            limit = 15,
                            className = '',
                            rowClasses = '',
                            rowStyles = {},
                            hasCheckbox = false,
                            hasIndexNumbers = true,
                            loading = false,
                            loaderComponent = 'Loading ...',
                            emptyStateComponent = 'There is no data!',
                            onRowClick = () => {
                            },
                            onItemsSelected = () => {
                            },
                            ...props
                          }: IDatatable): any => {
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
    const checked = $e.target.checked;
    if (checked) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  }

  const selectOne = ($e: any, item: any) => {
    const checked = $e.target.checked;
    let tmpSelectedItems = [...selectedItems];
    if (checked) {
      tmpSelectedItems.push(item);
    } else {
      tmpSelectedItems = tmpSelectedItems.filter(selectedItem => JSON.stringify(selectedItem) !== JSON.stringify(item));
    }
    setSelectedItems(tmpSelectedItems);
  }
  return <React.Fragment>{props.children ? <div className="table-responsive">
    <table className={`${className}`}>
      {props.children}
    </table>
  </div> : !loading ? <React.Fragment>
    {items.length > 0 ? <React.Fragment>
      <div className="table-responsive">
        <table className={`${className}`}>
          <thead>
          <tr>
            {hasIndexNumbers && <th style={{width: 35}}>#</th>}
            {hasCheckbox && <th
              style={{width: '20px'}}>
              <FormCheck onChange={selectAll} checked={checked} id={'select-all'}/>
            </th>}
            {headers
              .filter(({hidden}: any) => !hidden)
              .map((header: IHeader, index: number) => <th
                key={index}
                className={`fw-normal fw-bold ${header.className}`}>
                {header.title}
              </th>)}
            {actions?.length > 0 && <th></th>}
          </tr>
          </thead>
          <tbody>
          {items.map((item: any, idx: number) => <tr
            key={idx}
            className={`${rowClasses}`}
            style={rowStyles} onClick={() => onRowClick(item)}>
            {hasIndexNumbers && <td>{(page - 1) * limit + idx + 1}</td>}
            {hasCheckbox && <td>
              <FormCheck
                checked={selectedItems.some(selectedItem => JSON.stringify(selectedItem) === JSON.stringify(item))}
                onChange={($e: any) => selectOne($e, item)}
              />
            </td>}
            {headers.filter(({hidden}: any) => !hidden).map((header: IHeader, index: number) =>
              <td key={index}>
                {item[header.key]}
              </td>)}
            {actions?.length > 0 && <td>
              {actions.map((btn: IAction, index: number) =>
                <OverlayTrigger key={`${idx}-${index}`} placement="top"
                                overlay={<Tooltip>{btn.title}</Tooltip>}>
                  <a className={`text-${btn.variant} ms-1`}
                     onClick={($e: any) => {
                       $e.stopPropagation();
                       btn.action(item);
                     }}>
                    {btn.icon}
                  </a></OverlayTrigger>)}
            </td>}
          </tr>)}
          </tbody>
        </table>
      </div>
    </React.Fragment> : <React.Fragment>{emptyStateComponent}</React.Fragment>}
  </React.Fragment> : <React.Fragment>{loaderComponent}</React.Fragment>}
  </React.Fragment>
}

export default Datatable;




