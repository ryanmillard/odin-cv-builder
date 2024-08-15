import { useState, useEffect, useRef } from 'react';
import './cv-preview.scss';

function CVPreview({ CVData }) {
  const [scale, setScale] = useState(1); // CSS Transform Scale
  const containerReference = useRef(null); // Element reference

  const scalePreview = () => {
    if (!containerReference.current) return;

    const container = containerReference.current;
    const parent = container.parentElement;

    // Find smallest scale needed so it fits both height and width
    const heightScale = (parent.offsetHeight - 20) / container.offsetHeight;
    const widthScale = (parent.offsetWidth - 20) / container.offsetWidth;
    const newScale = Math.min(heightScale, widthScale);

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
    <div className='cv-container' ref={containerReference} style={{
      transform: `scale(${scale})`,
      transformOrigin: `center center`
    }}>
      <div className="cv-header">
        {CVData[0].items[0].value}
      {CVData[0].items.map(item => {
        return <div>{item.name}: {item.value}</div>
      })}
      </div>
    </div> 
  )
}

export default CVPreview; 