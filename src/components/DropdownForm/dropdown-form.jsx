import './dropdown-form.scss';

import FormItem from '../FormItem/form-item.jsx';

function DropdownForm(props) {
  return (
    <div className="dropdown-form">
      {Object.entries(props.formItems).map(([key,value]) => {
        return <FormItem itemName={key}/> 
      })}
    </div>
  )
}

export default DropdownForm;