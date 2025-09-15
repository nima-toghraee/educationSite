import Link from "next/link";

type Article = {
  id: string;
  title: string;
  summary: string;
};

const articles: Article[] = [
  {
    id: "learn-react",
    title: "یادگیری React به زبان ساده",
    summary: "مقدمه‌ای بر React و مفاهیم پایه آن...",
  },
  {
    id: "nextjs-guide",
    title: "راهنمای کامل Next.js",
    summary: "آموزش جامع نکست جی اس و قابلیت‌های آن...",
  },
];

export default function ArticlesPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">مقالات آموزشی</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="mb-4 border-b pb-4">
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
            <p className="text-gray-600 mt-1">{article.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
