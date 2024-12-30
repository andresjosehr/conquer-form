const formObj = {
  blocks: [
    {
      name: "welcome-screen",
      id: "welcome",
      attributes: {
        label: "Sesión de Admisión | Desarrollo Full Stack",
        description: "Déjanos saber un poco más acerca de ti antes de continuar. Este formulario solo te llevará 20 segundos y, al final del mismo, te mostraremos nuestro calendario para agendar una cita.",
        buttonText: "Comenzar"
      }
    },
    {
      name: "short-text",
      id: "name",
      attributes: {
        required: true,
        label: "Nombre",
        placeholder: ""
      }
    },
    {
      name: "email",
      id: "email",
      attributes: {
        required: true,
        label: "Tu mejor correo electronico",
        placeholder: ""
      }
    },
    {
      name: "phone-number",
      id: "phone",
      attributes: {
        required: true,
        label: "Numero de telefono",
        placeholder: ""
      }
    },
    {
      name: "multiple-choice",
      id: "age",
      attributes: {
        required: true,
        label: "¿Qué edad tienes?",
        multiple: false,
        choices: [
          {
            label: "Soy menor de 18 años",
            value: "<18",
          },
          {
            label: "Tengo entre 18 y 27 años",
            value: "18-27"
          },
          {
            label: "Tengo entre 28 y 50 años",
            value: "28-50"
          },
          {
            label: "Tengo entre 51 y 67 años",
            value: "51-67"
          },
          {
            label: "Soy mayor de 68 años",
            value: ">68"
          }
        ]
      }
    },
    {
      name: "multiple-choice",
      id: "employment_situation",
      attributes: {
        required: true,
        label: "¿En qué situación laboral te encuentras en este momento?",
        multiple: false,
        choices: [
          {
            label: "Tengo un empleo.",
            value: "Tengo un empleo."
          },
          {
            label: "Soy emprendedor / inversor.",
            value: "Soy emprendedor / inversor."
          },
          {
            label: "Soy estudiante.",
            value: "Soy estudiante."
          },
          {
            label: "Soy jubilado.",
            value: "Soy jubilado."
          },
          {
            label: "Me encuentro desempleado",
            value: "Me encuentro desempleado"
          }
        ]
      }
    },
    {
      name: "multiple-choice",
      id: "income",
      attributes: {
        required: true,
        label: "¿Qué ingresos mensuales estás generando en la actualidad? (convertido a dólares americanos)",
        multiple: false,
        choices: [
          {
            label: "Menos de 200 dólares mensuales.",
            value: "Menos de 200 dólares mensuales."
          },
          {
            label: "De 200 a 500 dólares mensuales.",
            value: "De 200 a 500 dólares mensuales."
          },
          {
            label: "De 500 a 700 dólares mensuales.",
            value: "De 500 a 700 dólares mensuales."
          },
          {
            label: "De 700 a 1000 dólares mensuales.",
            value: "De 700 a 1000 dólares mensuales."
          },
          {
            label: "Más de 1000 dólares mensuales.",
            value: "Más de 1000 dólares mensuales."
          }
        ]
      }
    },
    {
      name: "multiple-choice",
      id: "income_target",
      attributes: {
        required: true,
        label: "¿Cuál es tu objetivo de ingresos mensuales tras aprender a hacer trading de cuentas fondeadas?",
        multiple: false,
        choices: [
          {
            label: "Menos de 1000 dólares mensuales.",
            value: "Menos de 1000 dólares mensuales."
          },
          {
            label: "De 1000 a 3000 dólares mensuales.",
            value: "De 1000 a 3000 dólares mensuales."
          },
          {
            label: "De 3000 a 5000 dólares mensuales.",
            value: "De 3000 a 5000 dólares mensuales."
          },
          {
            label: "Más de 5000 dólares mensuales.",
            value: "Más de 5000 dólares mensuales."
          },
        ]
      }
    },
    {
      name: "long-text",
      id: "current_problems",
      attributes: {
        required: false,
        label: "¿Qué problemas encuentras en tu situación actual que quieres solucionar aprendiendo a generar ingresos con el trading de cuentas fondeadas?",
        placeholder: ""
      }
    },
  ],
  settings: {
    // animationDirection: "vertical",
    disableWheelSwiping: true,
    disableNavigationArrows: false,
    disableProgressBar: false,
    
  },
  theme: {
    font: "Roboto",
    buttonsBgColor: "#000000",
    logo: {
      src: ""
    },
    questionsColor: "#000",
    answersColor: "#bfbfbe",
    buttonsFontColor: "#fff",
    buttonsBorderRadius: 10,
    errorsFontColor: "#fff",
    errorsBgColor: "#e74c3c",
    progressBarFillColor: "#000",
    progressBarBgColor: "#ccc"
  }
};

export default formObj;
