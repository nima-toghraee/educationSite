type Props = {
  title: string;
  description: string;
};

export default function CourseHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
