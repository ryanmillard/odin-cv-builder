import './dropdown-form.scss';

import DropdownSection from '../DropdownSection/dropdown-section.jsx';
import FormItem from '../FormItem/form-item.jsx';

function DropdownForm({ name, icon, isCollapsable=true, form, valueChanged }) {
  // name="Personal Details"
  // icon={mdiAccountTie}
  // isCollapsable={false}
  // form={CVData["personalDetails"]}
  
  return ( 
    <DropdownSection name={name} icon={icon} isCollapsable={isCollapsable}>
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
    </DropdownSection>
  )
}

export default DropdownForm;