import Label from "./Label";
import Input from "./Input";

interface InputWLabelProps {
  id: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  classNameLabel?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  classNameInput?: string;
  text: string;
  value?: string | number;
  min?: string;
  max?: string;
  warning?: boolean;
  className?: string;
  warningMessage?: string;
  step?: string;
}

function InputWLabel({
  id,
  type,
  required,
  placeholder,
  classNameLabel = "",
  onChange,
  classNameInput = "",
  text,
  value,
  min,
  max,
  warning,
  className,
  warningMessage = "There is an error with this field",
  step,
}: InputWLabelProps) {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        text={text}
        className={classNameLabel}
        warning={warning}
      ></Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required ? required : false}
        onChange={onChange}
        className={classNameInput}
        value={value}
        min={min}
        max={max}
        warning={warning}
        step={step}
      ></Input>
      {warning ? <p className="text-red-600">{warningMessage}</p> : null}
      {/*<FloatingLabel
        variant="outlined"
        type={type}
        label={text}
        className="dark:bg-black"
      ></FloatingLabel>*/}
    </div>
  );
}

export default InputWLabel;
