interface InputProps {
  id: string;
  type: string;
  lang?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  min?: string;
  max?: string;
  warning?: boolean;
  name?: string;
  step?: string;
}

function Input({
  id,
  type,
  required,
  placeholder,
  className,
  lang,
  onChange,
  value,
  min,
  max,
  warning,
  name,
  step,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        id={id}
        className={
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " +
          className +
          (warning ? " border-red-600" : "")
        }
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        name={name}
        step={step}
        lang={lang}
      />
    </div>
  );
}

export default Input;
