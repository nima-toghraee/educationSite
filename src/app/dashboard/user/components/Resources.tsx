"use client";

const resources = [
  { name: "PDF ریاضی", link: "#" },
  { name: "ویدیو فیزیک", link: "#" },
];

export const Resources = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">منابع</h2>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {resources.map((res, idx) => (
          <li key={idx}>
            <a href={res.link} className="text-green-500 hover:underline">
              {res.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
