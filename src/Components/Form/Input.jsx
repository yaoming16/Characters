function Input({
  id,
  type,
  required,
  placeholder,
  className,
  onChange,
  value,
  min,
  max,
  warning,
  name,
  step,
}) {
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
      />
    </div>
  );
}

export default Input;
