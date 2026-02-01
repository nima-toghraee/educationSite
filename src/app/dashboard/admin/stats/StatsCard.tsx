type Props = {
  title: string;
  value: number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}
