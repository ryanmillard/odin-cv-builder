import { useRef, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import {
  mdiPalette,
  mdiArrowULeftTop,
  mdiEyedropperVariant,
  mdiCheckBold
} from '@mdi/js';

import './accent-picker.scss';

import DropdownSection from '../DropdownSection/dropdown-section.jsx';

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

function isBlackOrWhiteTextNeeded(r,g,b) {
  // Convert RGB to 'Relative Luminance' using a formula
  // to decide whether the colour needs white or black text.
  // Makes the text easier to see on certain background colours

  function formula(rgbValue) {
    const a = rgbValue / 255;
    return a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  }

  const luminance = (0.2126 * formula(r)) + (0.7152 * formula(g)) + (0.0722 * formula(b));
  return luminance > 0.3 ? 'black' : 'white'; // was 0.5 changed it to 0.3
}

function getRGBValues(cssRGBValue) {
  let regex = /[0-9]{1,3},\s*[0-9]{1,3},\s*[0-9]{1,3}/;
  let values = cssRGBValue.match(regex)[0].split(',');
  return values.map((value) => Number(value));
}

function hexToRGB(hexValue) {
  let regex = /[a-f0-9]{6}/i;
  let hex = hexValue.match(regex)[0];
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);
  return `rgb(${r},${g},${b})`;
}

function AccentChanger({ colour, isSelected, colourID, changeColour }) {  
  return (
    <div
      className="accent-changer"
      style={{backgroundColor: colour}}
      onClick={() => changeColour(colourID)}
    >{isSelected && <Icon path={mdiCheckBold} size={"25px"} color={"#fff"}/>}</div>
  )
}

function AccentColourPicker() {
  const [selectedID, setSelectedID] = useState(null);
  const [
    accentColourCSSValue,
    setAccentColourCSSValue
  ] = useState("rgb(87,109,123)");
  
  const currentColourReference = useRef(null);
  const hiddenPickerReference = useRef(null);

  function changeAccentColour(cssRGBValue) {
    let rgb = getRGBValues(cssRGBValue);
    let textColour = isBlackOrWhiteTextNeeded(rgb[0],rgb[1],rgb[2]);

    document.documentElement.style.setProperty("--accent-colour", cssRGBValue);
    document.documentElement.style.setProperty("--accent-text-colour", textColour);
    document.documentElement.style.setProperty(
      "--accent-heading-colour",
      textColour === 'white' ? 'whitesmoke' : 'rgb(36,31,49)'
    )
    setAccentColourCSSValue(cssRGBValue);
  }

  function changeColourPressed(colourID) {
    changeAccentColour(columns[colourID[0]][colourID[1]]);
    setSelectedID(colourID);
  }

  function resetBtnClicked() {
    changeAccentColour("rgb(87,109,123)");
    setSelectedID(null);
  }

  function colourPickerUsed(event) {
    changeAccentColour(hexToRGB(event.target.value));
    setSelectedID(null);
  }

  function customAccentPressed() {
    if (!hiddenPickerReference.current) return;
    const hiddenPicker = hiddenPickerReference.current;

    // Could not get useEffect to trigger when UI was actually
    // being shown meaning the reference was null on first show 
    hiddenPicker.addEventListener('input', colourPickerUsed);
    
    hiddenPicker.click();
  }

  useEffect(() => {
    if (!hiddenPickerReference.current) return;
    const hiddenPicker = hiddenPickerReference.current;

    hiddenPicker.addEventListener('input', colourPickerUsed);

    // If element gets deleted then remove event listener
    return () => {
      hiddenPicker.removeEventListener('input', colourPickerUsed);
    }
  });

  return (
    <DropdownSection name={"Accent Colour"} icon={mdiPalette}>
      <div className="current-colour" ref={currentColourReference}>
        Selected Colour: {accentColourCSSValue}
      </div>
      <div style={{
        display: "flex",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "5px"
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
                key={colourID}
                colour={colour}
                isSelected={isSelected}
                colourID={colourID}
                changeColour={changeColourPressed}
              />
            })}
          </div>
        })}
      </div>
      <div className="dropdown-options-container">
        <button 
          className="negative-btn"
          onClick={() => resetBtnClicked()}
        ><Icon path={mdiArrowULeftTop} size={"20px"}/>Reset Accent</button>
        <button
          className="primary-btn"
          onClick={() => customAccentPressed()}
        ><Icon path={mdiEyedropperVariant} size={"20px"}/>Custom Accent</button>
        {/* Hidden input so it can be used to prompt
            colour picker menu from button press */}
        <input
          type="color"
          aria-hidden="true"
          ref={hiddenPickerReference}
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
        />
      </div>
    </DropdownSection>
  )
}

export default AccentColourPicker;