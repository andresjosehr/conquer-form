import { useState, useEffect, useRef } from 'react';

const Dropdown = ({ countriesFiltered, handleSelectChange, selectedCountry, openDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOption(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    if (openDropdown) {
      setIsOpen(true);
    }
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleSelectChange({ target: { value: `+${option.phoneCode}` } });
    setIsOpen(false);
  };

  const getFlagUrl = (countryCode) => 
    `https://flagcdn.com/w40/${countryCode?.toLowerCase()}.png`;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {selectedOption ? (
          <>
            <img
              src={getFlagUrl(selectedOption.iso2)}
              alt={selectedOption.iso2}
              width="30"
            />
          </>
        ) : (
          'País'
        )}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {countriesFiltered.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="dropdown-item"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img
                src={getFlagUrl(option.code)}
                alt={option.code}
                width="20"
                height="15"
              />
              <span>{option.es}</span>
              <span style={{ marginLeft: 'auto' }}>{`+${option.phoneCode}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
