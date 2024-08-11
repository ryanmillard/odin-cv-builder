import { useState } from "react";

import './dropdown-section.scss';

import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';

import DropdownForm from '../DropdownForm/dropdown-form.jsx';

function DropdownSection({name, icon, isCollapsable=true, formItems}) {
  const [isCollapsed, setCollapsed] = useState(true);

  function menuClicked() {
    if (!isCollapsable) return;
    setCollapsed(!isCollapsed);
  }

  return (
    <div className={"dropdown-container " + (isCollapsable ? 'collapsable-container' : '')}>
      <div className="dropdown-header" onClick={menuClicked}>
        <span className='dropdown-name'><Icon path={icon} size={'30px'}/> {name}</span>
        {isCollapsable &&
          <Icon className="dropdown-menu-icon" path={
            isCollapsed ? mdiMenuDown : mdiMenuUp
          } size={'30px'}/>
        }
      </div>
      {(!isCollapsed || !isCollapsable) &&
        <DropdownForm formItems={formItems}/>
      }
    </div>
  );
}

export default DropdownSection;