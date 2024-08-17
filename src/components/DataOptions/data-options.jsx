import Icon from '@mdi/react';
import { mdiDelete, mdiPrinter } from '@mdi/js';

import DropdownSection from '../DropdownSection/dropdown-section.jsx';

function DataOptions({ deleteCVClicked, loadTemplateClicked }) {
  return (
    <DropdownSection isCollapsable={false} hasHeader={false}>
      <div className="dropdown-options-container">
        <button 
          className="dropdown-options-btn"
          style={{color: "#bf2121"}}
          onClick={deleteCVClicked}
        ><Icon path={mdiDelete} size={"20px"}/>Delete CV</button>
        <button
          className="dropdown-options-btn"
          onClick={loadTemplateClicked}
        >Load Template</button>
      </div>
    </DropdownSection>
  )
}

export default DataOptions;