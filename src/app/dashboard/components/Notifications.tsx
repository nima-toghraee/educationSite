"use client";

const notifications = [
  "آزمون ریاضی فردا برگزار می‌شود",
  "درس جدید فیزیک اضافه شد",
];

export const Notifications = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">اعلان‌ها</h2>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {notifications.map((note, idx) => (
          <li key={idx} className="border-b last:border-b-0 p-2">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};
