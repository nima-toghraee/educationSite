interface InputProps {
  type?: string;
  placeholder?: string;
  name: string; // ← اضافه شد

  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type = "text",
  placeholder,
  value,
  name,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  );
};
