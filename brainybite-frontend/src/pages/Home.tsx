import { useEffect, useState } from 'react';
import { fetchArticles, type ArticleResponse } from '../api/articleService';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';
  const categoryId = searchParams.get('category') || '';

  useEffect(() => {
    // for call API
    const loadArticles = async () => {
      try {
        // testing
        const data = await fetchArticles(0, 10, searchKeyword, categoryId ? Number(categoryId) : undefined);
        setArticles(data.content); // fetch only the array of articles.
      } catch (error) {
        console.error("An error occurred while retrieving the data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [searchKeyword, categoryId]);

  return (
    <div className="p-8">
      <div className="max-w-none mx-auto px-6 sm:px-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
          บทความล่าสุดจาก BrainyBite
        </h1>

        {loading ? (
          <div className="text-center text-slate-500 text-lg animate-pulse">กำลังโหลดข้อมูล...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* change it to a grid to display in 4 columns if the screen is large. */}
            {articles.map((article) => (
              <Link 
                to={`/article/${article.slug}`} 
                key={article.id} 
                // Add `overflow-hidden` that the image doesn't overflow the curved edges.
                className="block bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
              >
                {article.thumbnailUrl ? (
                  <img 
                    src={article.thumbnailUrl} 
                    alt={article.topic} 
                    // object-cover
                    className="w-full h-48 object-cover" 
                  />
                ) : (
                  // Fall Back
                  <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                    ไม่มีรูปภาพประกอบ
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-2 line-clamp-2">{article.topic}</h2>
                  <p className="text-slate-500 text-sm line-clamp-2">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;