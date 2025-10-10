type Props = {
  params: { id: string };
};

// mock data
async function getArticle(id: string) {
  const articles = [
    { id: "learn-react", title: "یادگیری React", content: "فصل اول..." },
    { id: "nextjs-guide", title: "راهنمای Next.js", content: "شروع کار..." },
  ];
  return articles.find((article) => article.id === id);
}

// Pre-generate params for SSG
export async function generateStaticParams() {
  return [{ id: "learn-react" }, { id: "nextjs-guide" }];
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.id);

  if (!article) {
    return (
      <main className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">مقاله پیدا نشد.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900">
        {article.title}
      </h1>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
        {article.content}
      </p>
    </main>
  );
}
