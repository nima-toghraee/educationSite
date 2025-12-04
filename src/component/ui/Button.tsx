interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button = ({ text, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
    >
      {text}
    </button>
  );
};
