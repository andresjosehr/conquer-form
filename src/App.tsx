// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect } from "react";
import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import "./App.css";
import { registerBlockType } from "@quillforms/blocks";
import axios from "axios";

registerCoreBlocks();
function App() {
  interface Country {
    es: string;
    en: string;
    iso2: string;
    iso3: string;
    phoneCode: string;
  }



  const getCountries = () => {
    return axios.get("/src/assets/countries.json").then((res) => {
      registerPhoneNumberBlock(res.data);
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const registerPhoneNumberBlock = (countries: Country[]) => {
    registerBlockType("phone-number", {
      supports: {
        editable: true, // Indica si el bloque se puede editar
      },
      attributes: {
        min: {
          type: "number",
          default: 1,
        },
        max: {
          type: "number",
          default: 10,
        },
      },

      display: ({
        id,
        next,
        attributes,
        setIsValid,
        setIsAnswered,
        setValidationErr,
        showNextBtn,
        blockWithError,
        val,
        setVal,
        showErrMsg,
      }) => {
        const { required } = attributes;

        // Estado interno para separar prefijo (país) y el número local
        const [selectedPrefix, setSelectedPrefix] = useState("+");
        const [localNumber, setLocalNumber] = useState("");

        useEffect(() => {
          // Cuando se monte el componente, si ya había un 'val' guardado
          // lo parseamos para que coincida con selectedPrefix y localNumber
          if (val) {
            // p.ej: val = "+57 3001234567"
            const parts = val.trim().split(/\s+/, 2);
            if (parts[0]?.startsWith("+")) {
              setSelectedPrefix(parts[0]);
              setLocalNumber(parts[1] || "");
            }
          }
        }, [val]);

        // Helper para actualizar la variable val de QuillForm
        const updateQuillVal = (prefix, phone) => {
          const newValue = prefix + " " + phone;
          setVal(newValue);

          // Validaciones simples de ejemplo
          if (!/^\+\d+\s?\d*$/.test(newValue)) {
            blockWithError("¡Formato de teléfono inválido!");
            return;
          } else {
            showErrMsg(false);
          }

          // Reglas de QuillForm: required, etc.
          if (newValue.trim() !== "+") {
            setIsAnswered(true);
            showNextBtn(true);
            setIsValid(true);
            setValidationErr(null);
          } else {
            setIsAnswered(false);
            showNextBtn(false);
            if (required) {
              setIsValid(false);
              setValidationErr("¡El campo es obligatorio!");
            }
          }
        };

        // Manejador para el select de países
        const handleSelectChange = (e) => {
          const newPrefix = e.target.value;
          setSelectedPrefix(newPrefix);
          updateQuillVal(newPrefix, localNumber);
        };

        // Manejador para el número local
        const handlePhoneChange = (e) => {
          const newLocalNumber = e.target.value.replace(/[^\d]/g, ""); // opcional: solo dígitos
          setLocalNumber(newLocalNumber);
          updateQuillVal(selectedPrefix, newLocalNumber);
        };

        // Para “autocompletar” país al tipear manualmente un prefijo en el input:
        // (por si el usuario escribe el + y parte del prefijo en lugar de usar el select)
        // Realmente depende de cómo quieras manejarlo;
        // aquí lo hacemos sólo si se edita manualmente selectedPrefix.
        const handlePrefixChange = (e) => {
          // Evita que se borre el "+"
          if (!e.target.value.startsWith("+")) {
            return;
          }
          setSelectedPrefix(e.target.value);
          updateQuillVal(e.target.value, localNumber);
          // Autoseleccionar país si coincide
          const match = countries.find((c) => e.target.value === c.phoneCode);
          if (match) {
            // si coincide con un prefijo exacto, selecciona el país
            console.log(match.phoneCode)
            setSelectedPrefix(match.phoneCode);
          }
        };

        return (
          <div
            className="qf-field__control-wrap"
            style={{ display: "flex", gap: "10px" }}
          >
            {/* 
              1) Input para el prefijo con + fijo que no se debe poder borrar.
              2) Un <select> para escoger país y actualizar el prefijo.
            */}

            {/* Input para el prefijo (por si el usuario quiere editarlo manualmente) */}
            <input
              type="text"
              className="css-215dze"
              style={{ width: "70px" }}
              value={selectedPrefix}
              onChange={handlePrefixChange}
            />

            {/* Input para el número local */}
            <input
              className="css-215dze"
              type="tel"
              placeholder="Ingresa tu teléfono"
              value={localNumber}
              onChange={handlePhoneChange}
            />

            {/* Select para autocompletar el prefijo según el país */}
            <select
              className="css-215dze"
              value={selectedPrefix}
              onChange={handleSelectChange}
              // style={{ minWidth: "150px" }}
            >
              <option value="">País</option>
              {countries.map((option, index) => (
                <option className="css-215dze" key={index} value={option.phoneCode}>
                  {option.es}
                </option>
              ))}
            </select>
          </div>
        );
      },
    });
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Form
        formId={1}
        formObj={{
          blocks: [
            {
              name: "welcome-screen",
              id: "jg14021r",
              attributes: {
                label: "Sesión de Admisión | Desarrollo Full Stack",
                description:
                  "Déjanos saber un poco más acerca de ti antes de continuar. Este formulario solo te llevará 20 segundos y, al final del mismo, te mostraremos nuestro calendario para agendar una cita.",
                buttonText: "Comenzar",
              },
            },
            {
              name: "short-text",
              id: "kd12edg",
              attributes: {
                required: false,
                label: "Nombre",
                placeholder: "",
              },
            },
            {
              name: "email",
              id: "gnlndf",
              attributes: {
                required: false,
                label: "Tu mejor correo electronico",
                placeholder: "",
              },
            },

            {
              name: "phone-number",
              id: "efvbdon347",
              attributes: {
                required: true,
                label: "Numero de telefono",
                placeholder: "",
              },
            },

            {
              name: "slider",
              id: "93pda11",
              attributes: {
                label: "Please choose your donation amount!",
                min: 0,
                max: 100,
                step: 1,
                prefix: "$",
                suffix: ",000",
              },
            },
            {
              name: "number",
              id: "wer3qdkdb",
              attributes: {
                required: true,
                label: "Great {{field:kdsfkdg}}, can you type your age?",
              },
            },
            {
              name: "dropdown",
              id: "3nsdf934",
              attributes: {
                choices: [
                  {
                    label: "Choice 1",
                    value: "choice-1",
                  },
                  {
                    label: "Choice 2",
                    value: "choice-2",
                  },
                ],
              },
            },
            {
              name: "long-text",
              id: "m35612edg",
              attributes: {
                required: true,
                label: "Type a brief about yourself!",
              },
            },
            {
              name: "date",
              id: "a213rsew",
              attributes: {
                required: true,
                label: "Please type your birth of date!",
              },
            },
            {
              name: "email",
              id: "iqfrqwr13r",
              attributes: {
                required: true,
                label: "Thanks {{field:kdsfkdg}}, please insert your email!",
              },
            },
            {
              name: "multiple-choice",
              id: "gqr1294c",
              attributes: {
                required: true,
                multiple: true,
                verticalAlign: false,
                label: "Which subjects do you love the most?",
                choices: [
                  {
                    label: "Physics",
                    value: "physics",
                  },
                  {
                    label: "Math",
                    value: "math",
                  },
                  {
                    label: "English",
                    value: "english",
                  },
                  {
                    label: "Biology",
                    value: "biology",
                  },
                ],
              },
            },
            {
              name: "statement",
              id: "g91imf1023",
              attributes: {
                label: "You are doing great so far!",
                buttonText: "Continue",
                quotationMarks: true,
              },
            },
            {
              name: "website",
              id: "bv91em9123",
              attributes: {
                required: true,
                multiple: true,
                label: "Please insert your website url!",
              },
            },
          ],
          settings: {
            animationDirection: "vertical",
            disableWheelSwiping: false,
            disableNavigationArrows: false,
            disableProgressBar: false,
          },
          theme: {
            font: "Roboto",
            buttonsBgColor: "#000000",
            logo: {
              src: "",
            },
            questionsColor: "#000",
            answersColor: "#bfbfbe",
            buttonsFontColor: "#fff",
            buttonsBorderRadius: 10,
            errorsFontColor: "#fff",
            errorsBgColor: "#e74c3c",
            progressBarFillColor: "#000",
            progressBarBgColor: "#ccc",
          },
        }}
        applyLogic={true}
        onSubmit={(data: any, { completeForm, setIsSubmitting }: any) => {
          setTimeout(() => {
            setIsSubmitting(false);
            completeForm();
          }, 500);
        }}
      />
    </div>
  );
}

export default App;
