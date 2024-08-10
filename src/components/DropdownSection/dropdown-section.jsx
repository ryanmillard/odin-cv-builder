import { useState } from "react";

import './dropdown-section.scss';

import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';

// import FormItem from '../FormItem/form-item.jsx';

function DropdownSection({name, icon, collapsable=true}) {
  const [isCollapsed, setCollapsed] = useState(true);

  function menuClicked() {
    setCollapsed(!isCollapsed);
  }

  return (
    <div className="dropdown-container" onClick={menuClicked}>
      <div className="dropdown-header">
        <span className='dropdown-name'><Icon path={icon} size={'30px'}/> {name}</span>
        {isCollapsed ? (
          <Icon className="dropdown-menu-icon" path={mdiMenuUp} size={'30px'}/>
        ) : (
          <Icon className="dropdown-menu-icon" path={mdiMenuDown} size={'30px'}/>
        )}
        </div>
      {/* <div className="dropdown-form">
        <FormItem/>
      </div> */}
    </div>
  );
}

export default DropdownSection;