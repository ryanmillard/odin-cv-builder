import { useState } from "react";
import './form-item.scss';

function FormItem({ formName, itemName, placeholder="", value="", valueChanged}) {
  const [itemValue, setItemValue] = useState(value);

  let camelCaseName = itemName.split(' ');
  camelCaseName[0] = camelCaseName[0].toLowerCase();
  camelCaseName = camelCaseName.join('');

  function inputValueChanged(newValue) {
    setItemValue(newValue);
    valueChanged(formName, itemName, newValue);
  }

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
        value={itemValue}
        onChange={(e) => inputValueChanged(e.target.value)}
      ></input>
    </div>
  )
}

export default FormItem;