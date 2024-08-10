import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/main.scss';
import DropdownSection from './components/DropdownSection/dropdown-section.jsx';

import { mdiAccountTie, mdiSchool, mdiBriefcase } from '@mdi/js';

function App() {
  return (
    <>
      <DropdownSection
        name="Personal Details"
        icon={mdiAccountTie}
      />
      <DropdownSection
        name="Education"
        icon={mdiSchool}
      />
      <DropdownSection
        name="Experience"
        icon={mdiBriefcase}
      />
    </>
  )
}

export default App;