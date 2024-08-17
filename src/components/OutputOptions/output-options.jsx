import Icon from '@mdi/react';
import { mdiDownload, mdiPrinter } from '@mdi/js';

import DropdownSection from '../DropdownSection/dropdown-section.jsx';

function OutputOptions({ downloadPDFClicked, printPDFClicked}) {
  return (
    <DropdownSection isCollapsable={false} hasHeader={false}>
      <div className="dropdown-options-container">
        <button 
          className="dropdown-options-btn"
          onClick={downloadPDFClicked}
        ><Icon path={mdiDownload} size={"20px"}/>Download PDF</button>
        <button
          className="dropdown-options-btn"
          onClick={printPDFClicked}
        ><Icon path={mdiPrinter} size={"20px"}/>Print CV</button>
      </div>
    </DropdownSection>
  )
}

export default OutputOptions;