
import React from 'react';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import countries from '../../data/countries';
import Country from '../../interfaces/Country';


const PhoneNumberBlock = (comp) => {


      const [selectedPrefix, setSelectedPrefix]       = useState("+");
      const [localNumber, setLocalNumber]             = useState("");
      const [countriesFiltered, setCountriesFiltered] = useState<Country[]>([]);
      const [selectedCountry, setSelectedCountry]     = useState<Country | null>(null);
      const [openDropdown, setOpenDropdown]           = useState(false);

      
  
      useEffect(() => {
        if (comp.val) {
          const parts = comp.val.trim().split(/\s+/, 2);
          if (parts[0]?.startsWith("+")) {
            setSelectedPrefix(parts[0]);
            setLocalNumber(parts[1] || "");
          }
        }
          setCountriesFiltered(countries);
          updateQuillVal(selectedPrefix, localNumber);
      }, [comp.val]);
      
  
      // Helper para actualizar la variable val de QuillForm
      const updateQuillVal = (selectedPrefix: string, localNumber: string) => {
        // 1. Verificar si existe un país seleccionado, que el prefijo del país coincida con el valor ingresado
          //  y que el número de teléfono no esté vacío.
          //  (Este es un ejemplo, ajusta la lógica según tus variables reales: selectedCountry, etc.)
        if (!selectedCountry || localNumber.trim().length < 8){
          
          comp.setVal(null);
          console.log(comp);
          return;
        }else{
          comp.setVal(JSON.stringify({
            country: selectedCountry,
            prefix: selectedPrefix,
            number: localNumber,
          }));
          console.log('desde el componente de phone', comp.val);
          comp.showNextBtn(true);
          comp.showErrMsg(false);
          comp.setIsValid(true);
          
        }
      };
  
      // Manejador para el select de países
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrefix = e.target.value;
        setSelectedPrefix(newPrefix);
        updateQuillVal(newPrefix, localNumber);
      
        // Resetear el filtro cuando un país ha sido seleccionado
        setCountriesFiltered(countries);
      
        // Focus en el input de número local
        const input = document.querySelector("input[type=tel]") as HTMLInputElement;
        if (input) {
          input.focus();
        }
      };
  
      // Manejador para el número local
      const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLocalNumber = e.target.value.replace(/[^\d]/g, ""); // opcional: solo dígitos
        setLocalNumber(newLocalNumber);
        updateQuillVal(selectedPrefix, newLocalNumber);
      };

      const handlePhoneErease = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && localNumber === "") {
          focusOnPrefixInput();
        }
      };
  
      // Para “autocompletar” país al tipear manualmente un prefijo en el input:
      // (por si el usuario escribe el + y parte del prefijo en lugar de usar el select)
      // Realmente depende de cómo quieras manejarlo;
      // aquí lo hacemos sólo si se edita manualmente selectedPrefix.
      const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Regresamos temprano si no empieza con "+"
        if (!value.startsWith("+")) return;
    
        const numericPrefix = value.replace("+", "");
        const matches = getMatches(numericPrefix);
    
        // Múltiples coincidencias
        if (matches.length > 1) {
          setCountriesFiltered(matches);
          setSelectedPrefix(value);
          setOpenDropdown(true); // Abrir dropdown
          updateQuillVal(value, localNumber);
          return;
        }
        setOpenDropdown(false); 
    
        // Solo una coincidencia
        if (matches.length === 1) {
          const newPrefix = `+${matches[0].phoneCode}`;
          setSelectedPrefix(newPrefix);
          focusOnTelInput();
          setSelectedCountry(matches[0]);
          updateQuillVal(newPrefix, localNumber);
          return;
        }
    
        // Sin coincidencias
        if (matches.length === 0) {
          const handled = handleNoMatches(value);
          // Si ya se manejó, detenemos la ejecución
          setSelectedCountry(null);
          if (handled) return;
        }
    
        // Por defecto (si no encajó en ningún caso anterior)
        setSelectedPrefix(value);
        updateQuillVal(value, localNumber);
      };

      const focusOnTelInput = () => {
        const input = document.querySelector("input[type=tel]") as HTMLInputElement;
        if (input) input.focus();
      }
      const focusOnPrefixInput = () => {
        const input = document.querySelector("input#prefix") as HTMLInputElement;
        if (input) input.focus();
      }


      /**
       * Maneja la lógica cuando no hay coincidencias (matches.length === 0).
       * Retorna `true` si se manejó el escenario dentro de esta función
       * y no se debe continuar ejecutando más lógica.
       */
      const handleNoMatches = (value: string): boolean => {
        // Si el valor actual es menor que el prefijo seleccionado,
        // asumimos que el usuario está borrando.
        if (value.length < selectedPrefix.length) {
          updateQuillVal(value, localNumber);
          setSelectedPrefix(value);
          return true;
        }

        // Chequeamos el "valor previo" para ver si hay coincidencias con su phoneCode.
        const previousValue = selectedPrefix.replace("+", "");
        const previousMatches = getMatches(previousValue);

        if (previousMatches.length === 1) {
          focusOnTelInput();
          updateQuillVal(value, localNumber);
          return true;
        }

        return false;
      };
      
      const getMatches = (numericPrefix: string) =>
        countries.filter((country) =>
          country.phoneCode === numericPrefix
        );
  
      return (
        <div className="qf-field__control-wrap" style={{ display: "flex", gap: "20px" }}>
  
          {/* Input para el prefijo (por si el usuario quiere editarlo manualmente) */}
          <input
            type="text"
            id="prefix"
            className="css-215dze"
            style={{ width: "100px" }}
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
            onKeyUp={handlePhoneErease}
          />

          {/* Select para autocompletar el prefijo según el país */}
          <Dropdown
          countriesFiltered={countriesFiltered}
          handleSelectChange={handleSelectChange}
          selectedCountry={selectedCountry}
          openDropdown={openDropdown}
        />



        </div>
      );
    
}

export default PhoneNumberBlock;