import { useEffect, useState } from "react";
import { fetchArticles, type ArticleResponse } from "../api/articleService";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0); //First page is 0
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") || "";

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchArticles(
          currentPage,
          12,
          searchKeyword,
          categoryId,
        );
        setArticles(data.content || []); // Pull only the article array to display.
        setTotalPages(data.totalPages || 0); // Save the total number of pages.
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [currentPage, searchKeyword, categoryId]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-none mx-auto px-6 sm:px-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
          บทความล่าสุดจาก BrainyBite
        </h1>

        {loading ? (
          <div className="text-center text-slate-500 text-lg animate-pulse">
            กำลังโหลดข้อมูล...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {" "}
            {/* change it to a grid to display in 4 columns if the screen is large. */}
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
                  <h2 className="text-xl font-bold text-blue-600 mb-2 line-clamp-2">
                    {article.topic}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16 pb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-6 py-2.5 rounded-full font-bold border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            &laquo; หน้าก่อนหน้า
          </button>

          <span className="text-slate-600 font-medium bg-slate-100 px-4 py-1.5 rounded-full text-sm">
            หน้า {currentPage + 1} จาก {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-6 py-2.5 rounded-full font-bold border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            หน้าถัดไป &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
