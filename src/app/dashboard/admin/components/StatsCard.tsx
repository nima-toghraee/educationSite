type Props = {
  title: string;
  value: number;
  maxValue: number;
  gradient: string;
  textColor: string;
};

export default function StatsCard({
  title,
  value,
  maxValue,
  gradient,
  textColor,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-48 transform hover:-translate-y-1">
      <div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </p>

        <p className={`text-4xl font-extrabold mt-2 ${textColor}`}>{value}</p>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 mt-4">
        <div
          className={`${gradient} h-3 rounded-full`}
          style={{
            width: `${(Math.min(value, maxValue) / maxValue) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
