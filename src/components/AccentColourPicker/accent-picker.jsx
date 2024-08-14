import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiPalette } from '@mdi/js';

import './accent-picker.scss';

import AccentChanger from '../AccentChanger/accent-changer.jsx';

const columns = [
  ['rgb(105,105,105)', 'rgb(52,57,62)', 'rgb(27,29,30)'],
  ['rgb(208,199,197)', 'rgb(175,155,148)', 'rgb(133,103,93)'],
  ['rgb(46,112,206)', 'rgb(20,65,129)', 'rgb(7,44,97)'],
  ['rgb(136,186,255)', 'rgb(70,133,221)', 'rgb(27,92,182)'],
  ['rgb(42,203,233)', 'rgb(6,164,193)', 'rgb(0,125,147)'],
  ['rgb(91,188,168)', 'rgb(44,128,111)', 'rgb(21,93,79)'],
  ['rgb(255,193,122)', 'rgb(246,145,30)', 'rgb(213,114,1)'],
  ['rgb(253,118,128)', 'rgb(203,69,78)', 'rgb(149,21,30)']
];

function AccentColourPicker() {
  const [selectedID, setSelectedID] = useState(null);

  function changeColour(colourID) {
    console.log(`Chaning ID ${selectedID}, ${colourID}`)
    const x = colourID[0];
    const y = colourID[1];
    const colour = columns[x][y];
    document.documentElement.style.setProperty("--accent-colour", colour);

    setSelectedID(colourID);
  }

  return (
    <div className="accent-picker-container">
      <div className="dropdown-header">
        <span className='dropdown-name'><Icon path={mdiPalette} size={'30px'}/> Accent Colour</span>
      </div>
      <div style={{
        display: "flex",
        borderRadius: "6px",
        overflow: "hidden"
      }}>
        {columns.map((column, columnIndex) => {
          return <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
            {column.map((colour, colourIndex) => {
              const colourID = `${columnIndex}${colourIndex}`;
              const isSelected = colourID === selectedID;
              return <AccentChanger
                colour={colour}
                isSelected={isSelected}
                colourID={colourID}
                changeColour={changeColour}
              />
            })}
          </div>
        })}
      </div>
    </div>
  )
}

export default AccentColourPicker;