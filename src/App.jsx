import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/main.scss';
import DropdownSection from './components/DropdownSection/dropdown-section.jsx';
import CVPreview from './components/CVPreview/cv-preview.jsx';
import AccentColourPicker from './components/AccentColourPicker/accent-picker.jsx';

import { mdiAccountTie, mdiSchool, mdiBriefcase } from '@mdi/js';
import DropdownForm from './components/DropdownForm/dropdown-form.jsx';

const templateData = {
  "personalDetails": {
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
};

for (const formName in templateData) {
  templateData[formName].items.forEach(item => {
    item.value = item.example;
  });
}

function App() {
  const [CVData, setCVData] = useState(templateData);

  function itemValueChanged(formName, formItemName, newValue) {
    setCVData(prevState => {
      return {
        ...prevState,
        [formName]: {
          ...prevState[formName],
          items: prevState[formName].items.map(item => {
            if (item.name !== formItemName) return item;
            return { ...item, value: newValue };
          })
        }
      };
    });
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="cv-details-input-container">
          <DropdownForm
            name="Personal Details"
            icon={mdiAccountTie}
            isCollapsable={false}
            form={CVData["personalDetails"]}
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