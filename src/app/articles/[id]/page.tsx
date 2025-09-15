type Props = {
  params: { id: string };
};

async function getArticle(id: string) {
  const articles = [
    { id: "learn-react", title: "یادگیری React", content: "فصل اول..." },
    { id: "nextjs-guide", title: "راهنمای Next.js", content: "شروع کار..." },
  ];
  return articles.find((article) => article.id === id);
}

export async function generateStaticParams() {
  return [{ id: "learn-react" }, { id: "nextjs-guide" }];
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.id);

  if (!article) {
    return <p>مقاله پیدا نشد.</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
      <p>{article.content}</p>
    </main>
  );
}
