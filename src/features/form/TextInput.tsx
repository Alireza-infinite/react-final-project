type Props = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
  defaultValue?: string;
  pattern?: string;
  minLenght?: number;
};

const TextInput = ({
  name,
  label,
  type,
  defaultValue,
  pattern,
  minLenght,
}: Props) => {
  return (
    <div className="grid grid-cols-3 items-center">
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        pattern={pattern}
        minLength={minLenght}
        className="col-span-2 rounded-xl border border-blue-600 bg-gray-50 px-3 py-2 focus:bg-white dark:bg-gray-800 focus:dark:bg-gray-900"
      />
    </div>
  );
};

export default TextInput;
