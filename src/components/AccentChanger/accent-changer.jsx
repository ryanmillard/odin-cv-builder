import Icon from '@mdi/react';
import { mdiCheckBold } from '@mdi/js';
import './accent-changer.scss';

function AccentChanger({ colour, isSelected, colourID, changeColour }) {  
  return (
    <div
      className="accent-changer"
      style={{backgroundColor: colour}}
      onClick={() => changeColour(colourID)}
    >{isSelected && <Icon path={mdiCheckBold} size={"25px"} color={"#fff"}/>}</div>
  )
}

export default AccentChanger;