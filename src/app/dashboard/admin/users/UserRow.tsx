import { User } from "@/types/article";
import UserActions from "./UserActions";

type Props = {
  user: User;
  onToggle: (id: number) => void;
};

export default function UserRow({ user, onToggle }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>

      <td className="p-3">{user.role_id === 1 ? "ادمین" : "کاربر"}</td>

      <td className="p-3">
        {user.is_active ? (
          <span className="text-green-600">فعال</span>
        ) : (
          <span className="text-red-600">غیرفعال</span>
        )}
      </td>

      <td className="p-3">
        {user.last_login
          ? new Date(user.last_login).toLocaleString("fa-IR")
          : "-"}
      </td>

      <td className="p-3">
        <UserActions user={user} onToggle={onToggle} />
      </td>
    </tr>
  );
}
