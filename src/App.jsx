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
    "items": [[
      {
        "id": "fullName",
        "name": "Full Name",
        "example": "John Smith",
        "placeholder": "Enter full name",
        "value": ""
      },
      {
        "id": "address",
        "name": "Address",
        "example": "Northamptonshire, UK",
        "placeholder": "Enter your address",
        "value": ""
      },
      {
        "id": "email",
        "name": "Email",
        "example": "john.smith@email.com",
        "placeholder": "Enter your email",
        "value": ""
      },
      {
        "id": "phoneNumber",
        "name": "Phone Number",
        "example": "+44 07124 457625",
        "placeholder": "Enter your phone number",
        "value": ""
      }
    ]],
  },
  "education": {
    "name": "education",
    "items": [[
      {
        "id": "school",
        "name": "School/University/Organisation",
        "example": "University of Cambridge",
        "placeholder": "Enter place of study",
        "value": ""
      },
      {
        "id": "qualification",
        "name": "Program/Qualification/Course",
        "example": "BSc Computer Science",
        "placeholder": "Enter your qualification",
        "value": ""
      },
      {
        "id": "startDate",
        "name": "Start Date",
        "example": "September 2012",
        "placeholder": "Enter the start date",
        "value": ""
      },
      {
        "id": "endDate",
        "name": "End Date",
        "example": "July 2016",
        "placeholder": "Enter the end date",
        "value": ""
      }
    ]],
  }
};

for (const formName in templateData) {
  templateData[formName].items.forEach(formData => {
    formData.forEach(item => {
      item.value = item.example;
    })
  });
}

function App() {
  const [CVData, setCVData] = useState(templateData);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const hiddenCVReference = useRef(null);

  function itemValueChanged(formName, formIndex, formItemName, newValue) {
    setCVData(prevState => {
      return {
        ...prevState,
        [formName]: {
          ...prevState[formName],
          items: prevState[formName].items.map((section, sectionIndex) => {
            if (sectionIndex !== formIndex) return section;

            return section.map(item => {
              if (item.name !== formItemName) return item;
              return { ...item, value: newValue };
            })
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
              items: formData.items.map(section => {
                return section.map(item => {
                  return { ...item, value: item.example };
                })
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
              items: formData.items.map(formSection => {
                return formSection.map(item => {
                  return { ...item, value: '' };
                })
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
              allowMultipleForms={false}
              valueChanged={itemValueChanged}
            />
            <DropdownForm
              name="Education"
              icon={mdiSchool}
              isCollapsable={true}
              form={CVData["education"]}
              allowMultipleForms={true}
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
      {/*
        Hidden CV necessary because the other CV Preview is effected
        by scale, so when the user goes to print or download the CV,
        the scale will still be used making the image quality worse.

        To avoid this, a copy of the CV with the right A4 size is
        hidden behind the rest of the UI. It cannot be display:none
        because otherwise html2canvas won't work. However, the user
        cannot see it anyway.

        The iframe is also hidden and only rendered when needed
        because the PDF cannot be prompted to be printed unless
        it is inside of an iframe.
      */}
      <div 
        className="hidden-cv-container"
        ref={hiddenCVReference}
        aria-hidden={true}
      ><CVPreview CVData={CVData} isHidden={true}/></div>
      {isPrinting &&
        <iframe
          className="hidden-iframe"
          id="iframePDF"
          src={pdfUrl}
          aria-hidden={true}
          onLoad={handleIframeLoad}
        ></iframe>
      }
    </>
  )
}

export default App;