import { useRef, useState } from "react";
import React from "react";
import { useEffect } from "react";
import Select from "react-select";

export default function SearchSelector({ options, name, onChange, error, floatLabel, placeholder, isDisabled, value, noClearButton }) {
  // const searchInput = useRef();
  const [valueObj, setValueObj] = useState(value)
  // console.log("value",value);
  
  const handleChange = (newValue, meta) => {
    setValueObj(newValue)
    const label = meta.name;
    
    onChange(newValue?.value, label, newValue?.ele)
    if (!newValue?.value) {
      setIsFloat(false)
    } else {
      setIsFloat(true)
    }

  };
  const [isFloat, setIsFloat] = useState(valueObj)
  function setLabel() {
    if (!valueObj) {
      setIsFloat(true)
    }
  }

  useEffect(() => {
    if (!value) {
      onChange("", name)
      setValueObj("")
    } else {
      setValueObj(value)
    }
  }, [value])

  // useEffect(() => {
  //   setValueObj(value || "")
  // },[value])

  return (
    <div className="relative w-full">
      <Select
        // defaultValue={{ value: value, label: value }}
        id="floating"
        options={options}
        onChange={handleChange}
        name={name}
        placeholder={!floatLabel ? placeholder || "" : ""}
        value={valueObj}
        // menuPortalTarget={document.body} 
        menuPosition={'fixed'}
        menuPlacement="auto"
        isDisabled={isDisabled}
        isClearable={noClearButton ? false : true}
        styles={{
          // control: (baseStyles, state) => (console.log(state)),
          control: (baseStyles, state) => ({
            // label :  "control"
            // display :  "flex"
            // position :  "relative"
            ...baseStyles,
            cursor: 'pointer',
            borderColor: !isDisabled && error ? 'red' : state.isHovered && 'initial',
            // background: isDisabled && '#E5E7EB',
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            //  background: "pink",
            border: "none"
          }),
        }}
        onMenuOpen={setLabel}
        onMenuClose={() => !valueObj && setIsFloat(false)}
      // backspaceRemovesValue={false}
      // components={{ DropdownIndicator, IndicatorSeparator: null }}
      // controlShouldRenderValue={false}
      // hideSelectedOptions={false}
      />
      <label for="floating" className={`${floatLabel ? "absolute" : "hidden"} ${isFloat ? "top-[.25em] bg-white" : "top-[1.25em] text-lg"} px-2 text-gray-500  duration-300 transform -translate-y-4 scale-75  origin-[0]  peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
        {placeholder}
      </label>
    </div>
  )
}