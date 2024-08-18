import { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMapMarker, mdiEmail, mdiPhone } from '@mdi/js';

import './cv-preview.scss';

function CVSubheader({ title }) {
  return (
    <div className="cv-subheader">{title}</div>
  )
}

function CVPreview({ CVData, isHidden=false }) {
  const [scale, setScale] = useState(1); // CSS Transform Scale
  const containerReference = useRef(null); // Element reference

  const scalePreview = () => {
    if (isHidden) return;
    if (!containerReference.current) return;

    let container = containerReference.current;
    let parent = container.parentElement;
    let padding = 20; // In pixels

    // Find smallest scale needed so it fits both height and width
    let heightScale = (parent.offsetHeight - padding) / container.offsetHeight;
    let widthScale = (parent.offsetWidth - padding) / container.offsetWidth;
    let newScale = Math.min(heightScale, widthScale);

    setScale(newScale);
  };

  useEffect(() => {
    scalePreview(); // Scale when element is made

    // Scale when window resizes
    window.addEventListener("resize", scalePreview);

    // If element gets deleted then remove event listener
    return () => { window.removeEventListener("resize", scalePreview); }
  },[]);

  return (
    <div
      className='cv-container'
      ref={containerReference}
      style={
        isHidden ? {
          borderRadius: "0px"
        } : {
          transform: `scale(${scale})`,
          transformOrigin: `center center`
        }
      }>
      <div className="cv-header" onClick={() => generatePDF()}>
        <div className="fullName-container"><span>{CVData["personalDetails"].items[0][0].value}</span></div>
        <div className="cv-header-items-container">
          {CVData["personalDetails"].items[0][1].value &&
            <div className="cv-header-item">
              <Icon path={mdiMapMarker} size={"20px"}/>
              {CVData["personalDetails"].items[0][1].value}
            </div>
          }
          {CVData["personalDetails"].items[0][2].value &&
            <div className="cv-header-item">
              <Icon path={mdiEmail} size={"20px"}/>
              {CVData["personalDetails"].items[0][2].value}
            </div>
          }
          {CVData["personalDetails"].items[0][3].value &&
            <div className="cv-header-item">
              <Icon path={mdiPhone} size={"20px"}/>
              {CVData["personalDetails"].items[0][3].value}
            </div>
          }
        </div>
      {/* {CVData["personalDetails"].items.map(item => {
        return <div>{item.name}: {item.value}</div>
      })} */}
      </div>
      <CVSubheader title={"Education"}/>
    </div> 
  )
}

export default CVPreview; 