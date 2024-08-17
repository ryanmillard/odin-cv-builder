import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './styles/main.scss';

import CVPreview from './components/CVPreview/cv-preview.jsx';
import AccentColourPicker from './components/AccentColourPicker/accent-picker.jsx';
import DropdownForm from './components/DropdownForm/dropdown-form.jsx';
import OutputOptions from './components/OutputOptions/output-options.jsx';
import DataOptions from './components/DataOptions/data-options.jsx';

import { mdiAccountTie, mdiSchool, mdiBriefcase } from '@mdi/js';

const templateData = {
  "personalDetails": {
    "name": "personalDetails",
    "items": [
      {
        "name": "Full Name",
        "example": "John Smith",
        "placeholder": "Enter full name",
        "value": ""
      },
      {
        "name": "Address",
        "example": "Northamptonshire, UK",
        "placeholder": "Enter your address",
        "value": ""
      },
      {
        "name": "Email",
        "example": "john.smith@email.com",
        "placeholder": "Enter your email",
        "value": ""
      },
      {
        "name": "Phone Number",
        "example": "+44 07124 457625",
        "placeholder": "Enter your phone number",
        "value": ""
      }
    ],
  }
};

for (const formName in templateData) {
  templateData[formName].items.forEach(item => {
    item.value = item.example;
  });
}

function App() {
  const [CVData, setCVData] = useState(templateData);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const hiddenCVReference = useRef(null);

  function itemValueChanged(formName, formItemName, newValue) {
    setCVData(prevState => {
      return {
        ...prevState,
        [formName]: {
          ...prevState[formName],
          items: prevState[formName].items.map(item => {
            if (item.name !== formItemName) return item;
            return { ...item, value: newValue };
          })
        }
      };
    });
  }

  function loadTemplateData() {
    setCVData(prevState => {
      return Object.fromEntries(
        Object.entries(prevState).map(([formName, formData]) => {
          return [
            formName,
            {
              ...formData,
              items: formData.items.map(item => {
                return { ...item, value: item.example };
              })
            }
          ]
        })
      )
    });
  }

  function deleteCVData() {
    setCVData(prevState => {
      return Object.fromEntries(
        Object.entries(prevState).map(([formName, formData]) => {
          return [
            formName,
            {
              ...formData,
              items: formData.items.map(item => {
                return { ...item, value: '' };
              })
            }
          ]
        })
      )
    });
  }

  async function createPDFObject() {
    if (!hiddenCVReference.current) return null;
    let cv = hiddenCVReference.current;
    let canvas = await html2canvas(cv, {useCORS:true, scale:2});
    let imgData = canvas.toDataURL("image/png");
    
    let pdf = new jsPDF("p", "mm", "a4");
    let width = 210;
    let height = 297;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    return pdf;
  }

  async function printPDF() {
    let pdf = await createPDFObject();
    if (!pdf) return;
    let pdfBlob = pdf.output('blob');
    let newPdfURL = URL.createObjectURL(pdfBlob);
    setPdfUrl(newPdfURL);
    setIsPrinting(true);
  }

  async function downloadPDF() {
    let pdf = await createPDFObject();
    if (!pdf) return;
    pdf.save('CV.pdf');
  }

  function handleIframeLoad() {
    let iframe = document.getElementById('iframePDF');
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
      setIsPrinting(false);
    }, 1000);
  }

  return (
    <>
      <div className="app-wrapper">
        <div className="app-container">
          <div className="cv-details-input-container">
            <DataOptions
              deleteCVClicked={deleteCVData}
              loadTemplateClicked={loadTemplateData}
            />
            <DropdownForm
              name="Personal Details"
              icon={mdiAccountTie}
              isCollapsable={false}
              form={CVData["personalDetails"]}
              valueChanged={itemValueChanged}
            />
            <AccentColourPicker/>
            {/* <DropdownSection
              name="Education"
              icon={mdiSchool}
            />
            <DropdownSection
              name="Experience"
              icon={mdiBriefcase}
            /> */}
            <OutputOptions
              downloadPDFClicked={downloadPDF}
              printPDFClicked={printPDF}
            />
          </div>
          <div className="cv-wrapper">
            <CVPreview CVData={CVData}/>
          </div>
        </div>
      </div>
      <div className="hidden-cv-container" ref={hiddenCVReference}>
        <CVPreview CVData={CVData} isHidden={true}/>
      </div>
      {isPrinting &&
        <iframe
          id="iframePDF"
          src={pdfUrl}
          style={{
            width: "100%",
            height: "0px",
            border: "none",
            zIndex: "-1000"
          }}
          onLoad={handleIframeLoad}
          title="CV PDF Preview"
        ></iframe>
      }
    </>
  )
}

export default App;