import { useState } from "react";
import './form-item.scss';

function FormItem({ formName, sectionIndex, itemName, itemID, placeholder="", value, valueChanged}) {
  let camelCaseName = itemName.split(' ');
  camelCaseName[0] = camelCaseName[0].toLowerCase();
  camelCaseName = camelCaseName.join('');

  return (
    <div className="formItem">
      <label className="formItemLabel" htmlFor={camelCaseName}>{itemName}</label>
      <input
        className="formItemInput"
        type="text"
        id={itemID}
        name={camelCaseName}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => valueChanged(formName, sectionIndex, itemName, e.target.value)}
      ></input>
    </div>
  )
}

export default FormItem;