import './dropdown-form.scss';

import DropdownSection from '../DropdownSection/dropdown-section.jsx';
import FormItem from '../FormItem/form-item.jsx';
import { useState } from 'react';

import Icon from '@mdi/react';
import { mdiPlus, mdiArrowLeft } from '@mdi/js';

function FormSectionButton({ formSection, sectionIndex, buttonPressed }) {
  let name = formSection[0].value === '' ? 'Unnamed' : formSection[0].value;
  return (
    <>
      <button
        className="form-section-btn"
        onClick={() => buttonPressed(sectionIndex)}
      >{name}</button>
    </>
  )
}

function DropdownForm({
  name,
  icon,
  isCollapsable=true,
  form,
  allowMultipleForms=false,
  valueChanged
}) {
  const [currentFormSection, setCurrentFormSection] = useState(0);
  const [isSectionBeingShown, setIsSectionBeingShown] = useState(false);

  function showSection(sectionIndex) {
    setCurrentFormSection(sectionIndex);
    setIsSectionBeingShown(true);
  }

  function backToSectionMenu() {
    setIsSectionBeingShown(false);
    setCurrentFormSection(0);
  }

  return ( 
    <DropdownSection name={name} icon={icon} isCollapsable={isCollapsable}>
      {(!allowMultipleForms || isSectionBeingShown) ? (
        <div className="dropdown-form">
          {form.items.map((section, sectionIndex) => {
            if (sectionIndex !== currentFormSection) return;
            return section.map(item => {
              return <FormItem
                key={item.name}
                formName={form.name}
                sectionIndex={sectionIndex}
                itemName={item.name}
                itemID={item.id}
                placeholder={item.placeholder}
                value={item.value}
                valueChanged={valueChanged}
              />
            })
          })}
          {allowMultipleForms &&
            <div className="form-btn-container">
              <button
                className="form-btn"
                onClick={backToSectionMenu}
              ><Icon path={mdiArrowLeft} size={'20px'}/>Back</button>
            </div>
          }
        </div>
      ) : (
        <div className="form-section-container">
          {form.items.map((section, sectionIndex) => {
            return <FormSectionButton
              formSection={section}
              sectionIndex={sectionIndex}
              buttonPressed={showSection}
            />
          })}
          <div className="form-btn-container">
            <button className="form-btn">
              <Icon path={mdiPlus} size={'20px'}/>{`New ${form.name}`}
            </button>
          </div>
        </div>
      )}
    </DropdownSection>
  )
}

export default DropdownForm;