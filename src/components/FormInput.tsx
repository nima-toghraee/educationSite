interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  textarea = false,
  options,
  rows = 4,
}: FormInputProps) {
  if (textarea) {
    return (
      <label className="block mb-6">
        <span className="text-gray-900 text-lg font-semibold">{label}</span>
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
        />
      </label>
    );
  }

  if (type === "select" && options) {
    return (
      <label className="block mb-6">
        <span className="text-gray-900 text-lg font-semibold">{label}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
          required={required}
        >
          <option value="">انتخاب کنید</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block mb-6">
      <span className="text-gray-900 text-lg font-semibold">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
        required={required}
      />
    </label>
  );
}
