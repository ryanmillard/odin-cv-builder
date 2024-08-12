import './dropdown-form.scss';

import FormItem from '../FormItem/form-item.jsx';

function DropdownForm({ form, valueChanged }) {
  return (
    <div className="dropdown-form">
      {form.items.map((item) => {
        return <FormItem
          key={item.name}
          formName={form.name}
          itemName={item.name}
          placeholder={item.placeholder}
          value={item.value}
          valueChanged={valueChanged}
        />
      })}
    </div>
  )
}

export default DropdownForm;