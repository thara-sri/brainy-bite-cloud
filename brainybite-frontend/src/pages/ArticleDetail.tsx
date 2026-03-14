import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleBySlug, type ArticleResponse } from '../api/articleService';

function ArticleDetail() {
  const { slug } = useParams(); // extract slug from URL (ex. /article/my-first-blog)
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      try {
        const data = await fetchArticleBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error("Article retrieval failed.", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]); // if slug changed, call useEffect again

  if (loading) return <div className="p-8 text-center text-slate-500">กำลังโหลดเนื้อหา...</div>;
  if (!article) return <div className="p-8 text-center text-red-500">ไม่พบบทความนี้</div>;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; กลับหน้าหลัก
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{article.topic}</h1>
        <p className="text-slate-500 mb-8 border-b pb-4">{article.description}</p>
        
        <div 
          className="prose prose-lg prose-blue max-w-none text-slate-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </div>
    </div>
  );
}

export default ArticleDetail;