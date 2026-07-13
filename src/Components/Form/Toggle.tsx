interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

function Toggle({ label, checked, onChange, className } : ToggleProps) {
  return (
    <label className={`${className ?? ""} inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm cursor-pointer transition hover:border-slate-300 hover:bg-slate-50`}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="relative h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-sky-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white"></div>
      <span className="text-sm font-medium text-slate-800">{label}</span>
    </label>
  );
}

export default Toggle;
