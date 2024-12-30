
import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import './App.css'
import { registerBlockType } from '@quillforms/blocks';
import PhoneNumberBlock from "./custom-blocks/phone-number/phone-number";
import formObj from './data/formObj'; // Importar el objeto formObj
import scores from './data/scores';

registerCoreBlocks();
function App() {
  
  registerBlockType("phone-number", {
    supports: {
      editable: true, // Indica si el bloque se puede editar
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display: (comp: any) => PhoneNumberBlock(comp),
  });

   const goNextBlock = (props) => {
    props.setIsFieldValid(props.currentBlockId, true);
    props.setFieldValidationErr(props.currentBlockId, "");
    props.setIsCurrentBlockSafeToSwipe(true);
    props.goNext();
  }
  const deniedGoNext = (props, error: string) => {
    props.setIsFieldValid(props.currentBlockId, false);
    props.setFieldValidationErr(props.currentBlockId, error);
    props.setIsCurrentBlockSafeToSwipe(false);
  }

  const submitForm = (data, { completeForm, setIsSubmitting }: { completeForm: () => void; setIsSubmitting: (isSubmitting: boolean) => void }) => {
    const answers =  data.answers;
    const score = scores.reduce((acc, score) => {
      const fieldValue = answers[score.name]?.value[0];
      return (score[fieldValue] ?? 0) + acc;
    }, 0) / 5;

    alert(`Tu puntaje es: ${score}`);

    if(answers.age.value[0] === "<18" || score < 2 || answers.income.value[0] === 'Menos de 200 dólares mensuales.') {
      alert('Primero');
      window.location.href = 'https://calendly.com/d/cn79-sv7-b3x/sesion-de-claridad-desarrollo-full-stack-eu';
      return;
    }

    if(score >= 2 && score <= 3) {
      alert('Segundo');
      window.location.href = 'https://calendly.com/d/cn79-sv7-b3x/sesion-de-claridad-desarrollo-full-stack-eu';
      return;
    }

    if(score >= 3 && score <= 4) {
      alert('Tercero');
      window.location.href = 'https://calendly.com/d/cn79-sv7-b3x/sesion-de-claridad-desarrollo-full-stack-eu';
      return;
    }

    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   completeForm();
    // }, 500);
  }


  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Form
        formId={1}
        beforeGoingNext={(props) => {
          
          if (props.currentBlockId === "phone") {
            if(!(props.answers[props.currentBlockId] as { value: string }).value) {
              deniedGoNext(props, "Debes seleccionar el prefijo del pais y e ingresar tu número de teléfono");
            } else{
              goNextBlock(props);
            }
            
          } 
          else{

            if(props.currentBlockId==='email') {
              setTimeout(() => {
                // Focus on "prefix" field
                const prefixField = document.getElementById("prefix");
                if(prefixField) {
                  prefixField.focus();
                }
              }, 800);
            }
            goNextBlock(props);
          }
        }}
        formObj={formObj} // Usar el objeto formObj importado
        applyLogic={true}
        onSubmit={submitForm}
      />
    </div>
  )
}

export default App


