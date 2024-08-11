import './form-item.scss';

function FormItem({ itemName, placeholder="" }) {
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
      ></input>
    </div>
  )
}

export default FormItem;