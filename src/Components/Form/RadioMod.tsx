import Input from "./Input";

interface RadioModProps {
  options: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  currentValue: string;
}

function RadioMod({ options, onChange, currentValue } : RadioModProps) {
  
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4 w-full">
      {
        options.map((option : string, index : number) => (
          <div className="flex flex-col items-center justify-center gap-2" key={option}>
            <label htmlFor={option} className="text-center max-w-[75px]">
              <img src={option} className="object-cover mx-auto" />
            </label>
            <Input
              type="radio"
              id={option}
              name={"grid-input"}
              onChange={onChange}
              value={option}
              className="w-auto mx-auto"
              checked={option === currentValue}
            ></Input>
          </div>
        ))
      }
    </div>
  );
}

export default RadioMod;
