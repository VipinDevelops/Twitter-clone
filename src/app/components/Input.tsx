interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = 'text',
  onChange,
  disabled,
  label,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className="block w-full px-6 pt-6 pb-1 text-white rounded-md appearance-none peer text-lg bg-black border-2 border-neutral-800 focus:outline-none focus:ring-0 focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
        placeholder=" "
        required
      />
      <label
        className="absolute duration-150 transform text-md text-gray-500 -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-sky-500"
        htmlFor={placeholder}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
