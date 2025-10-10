import { Select, Label } from "flowbite-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function SelectMod({ setFunction, selectInfo, id }) {
  // We Use UseRef so the options don´t reRender when the user changes the font. This is to stop a bug that consisted in that the user selected option didt show correctly in the interface
  let options = useRef(
    selectInfo.values.map((value, index) => (
      <option
        key={uuidv4()}
        className="dark:text-black"
        value={value}
        style={{
          fontFamily: value,
          fontSize: "16px",
        }}
      >
        {selectInfo.text[index]}
      </option>
    ))
  );

  return (
    <div className="max-w-md dark:bg-white mt-3">
      <Label htmlFor={id} value="Select the font" className="dark:text-black" />

      <Select
        id={id}
        className="dark:bg-white dark:text-black"
        onChange={(e) => setFunction(e.target.value)}
      >
        {options.current}
      </Select>
    </div>
  );
}

SelectMod.propTypes = {
  setFunction: PropTypes.func.isRequired,
  selectInfo: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default SelectMod;
