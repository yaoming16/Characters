interface LabelProps {
  htmlFor: string;
  className?: string;
  text: string;
  warning?: boolean;
}

function Label({ htmlFor, className = "", text, warning = false }: LabelProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={
          "block mb-2 text-sm font-medium text-black " +
          className +
          (warning ? " text-red-600" : "")
        }
      >
        {text}
      </label>
      {warning ? <p className="text-red-600"></p> : ""}
    </>
  );
}

export default Label;
