import { useState } from "react";
import './form-item.scss';

function FormItem({ formName, itemName, placeholder="", value, valueChanged}) {
  let camelCaseName = itemName.split(' ');
  camelCaseName[0] = camelCaseName[0].toLowerCase();
  camelCaseName = camelCaseName.join('');

  return (
    <div className="formItem">
      <label className="formItemLabel" htmlFor={camelCaseName}>{itemName}</label>
      <input
        className="formItemInput"
        type="text"
        id={camelCaseName}
        name={camelCaseName}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => valueChanged(formName, itemName, e.target.value)}
      ></input>
    </div>
  )
}

export default FormItem;