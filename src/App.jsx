import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/main.scss';
import DropdownSection from './components/DropdownSection/dropdown-section.jsx';
import CVPreview from './components/CVPreview/cv-preview.jsx';
import AccentColourPicker from './components/AccentColourPicker/accent-picker.jsx';

import { mdiAccountTie, mdiSchool, mdiBriefcase } from '@mdi/js';

const templateData = [
  {
    "name": "personalDetails",
    "items": [
      {
        "name": "Full Name",
        "example": "John Smith",
        "placeholder": "Enter full name",
        "value": ""
      },
      {
        "name": "Address",
        "example": "Northamptonshire, UK",
        "placeholder": "Enter your address",
        "value": ""
      },
      {
        "name": "Email",
        "example": "john.smith@email.com",
        "placeholder": "Enter your email",
        "value": ""
      },
      {
        "name": "Phone Number",
        "example": "+44 07124 457625",
        "placeholder": "Enter your phone number",
        "value": ""
      }
    ],
  }
];

function App() {
  const [CVData, setCVData] = useState(templateData);
  
  console.log(CVData);

  function itemValueChanged(formName, formItemName, newValue) {
    setCVData(prevState => {
      return prevState.map((form) => {
        if (form.name !== formName) return form;
        return {
          ...form,
          items: form.items.map((item) => {
            if (item.name !== formItemName) return item;
            return { ...item, value: newValue };
          })
        };
      });
    });
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="cv-details-input">
          <DropdownSection
            name="Personal Details"
            icon={mdiAccountTie}
            isCollapsable={false}
            form={templateData[0]}
            valueChanged={itemValueChanged}
          />
          <AccentColourPicker/>
          {/* <DropdownSection
            name="Education"
            icon={mdiSchool}
          />
          <DropdownSection
            name="Experience"
            icon={mdiBriefcase}
          /> */}
        </div>
        <div className="cv-wrapper">
          <CVPreview CVData={CVData}/>
        </div>
      </div>
    </div>
  )
}

export default App;