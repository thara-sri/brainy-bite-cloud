import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyArticles } from "../api/articleService";

export default function MyArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyArticles = async () => {
      try {
        const data = await fetchMyArticles();
        setArticles(data.content || []);
      } catch (error) {
        console.error("Failed to fetch my articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyArticles();
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-500">
        กำลังโหลดบทความของคุณ...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">บทความของฉัน</h1>
        <Link
          to="/write"
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          + เขียนบทความใหม่
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-lg text-slate-500 mb-4">
            คุณยังไม่มีบทความเลย เริ่มเขียนบทความแรกของคุณสิ!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {article.thumbnailUrl && (
                <img
                  src={article.thumbnailUrl}
                  alt={article.topic}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                  {article.topic}
                </h2>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                  {article.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                  <Link
                    to={`/article/${article.slug}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    อ่านเพิ่มเติม
                  </Link>
                  <Link
                    to={`/edit/${article.slug}`}
                    className="px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-bold rounded-full hover:bg-orange-100 transition-colors"
                  >
                    แก้ไข
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
