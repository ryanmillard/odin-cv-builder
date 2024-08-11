import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/main.scss';
import DropdownSection from './components/DropdownSection/dropdown-section.jsx';

import { mdiAccountTie, mdiSchool, mdiBriefcase } from '@mdi/js';

const templateData = {
  "single": {  
    "personalDetails": {
      "fullName": "John Smith",
      "address": "Northamptonshire, UK",
      "email": "john.smith@email.com",
      "phone": "+44 07124 457625"
    }
  },
  "multiple": {
    "education": []
  }
}

function App() {
  return (
    <>
      <div className="cv-details-input">
        <DropdownSection
          name="Personal Details"
          icon={mdiAccountTie}
          isCollapsable={false}
          formItems={templateData.single.personalDetails}
        />
        {/* <DropdownSection
          name="Education"
          icon={mdiSchool}
        />
        <DropdownSection
          name="Experience"
          icon={mdiBriefcase}
        /> */}
      </div>
    </>
  )
}

export default App;