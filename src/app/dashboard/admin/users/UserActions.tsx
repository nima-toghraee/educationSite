import { User } from "@/types/article";

type Props = {
  user: User;

  onToggle: (id: number) => void;
};

export default function UserActions({ user, onToggle }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onToggle(user.id)}
        className={`px-2 py-1 text-xs rounded text-white ${
          user.is_active ? "bg-yellow-500" : "bg-green-600"
        }`}
      >
        {user.is_active ? "غیرفعال" : "فعال"}
      </button>
    </div>
  );
}
