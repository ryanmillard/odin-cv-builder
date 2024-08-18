import './dropdown-section.scss';

import { Children, useState } from "react";
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';

function DropdownSection({name, icon, isCollapsable=true, hasHeader=true, children}) {
  const [isCollapsed, setCollapsed] = useState(true);

  function menuClicked() {
    if (!isCollapsable) return;
    setCollapsed(!isCollapsed);
  }

  return (
    <div className={"dropdown-container"}>
      {hasHeader &&
        <div className={"dropdown-header " + (isCollapsable ? 'clickable-header' : '')} onClick={menuClicked}>
          <span className='dropdown-name'><Icon path={icon} size={'30px'}/> {name}</span>
          {isCollapsable &&
            <Icon className="dropdown-menu-icon" path={
              isCollapsed ? mdiMenuDown : mdiMenuUp
            } size={'30px'}/>
          }
        </div>
      }
      {(!isCollapsed || !isCollapsable) &&
        Children.map(children, child => {
          return child;
        })
      }
    </div>
  );
}

export default DropdownSection;