import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/articleService";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}&category=${category}`);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Category retrieval failed:", error);
      }
    };
    loadCategories();
  }, []);

  return (
    // sticky top-0 z-50
    // backdrop-blur-md
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-none mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-extrabold text-blue-600 tracking-tighter hover:opacity-80 transition-opacity"
            >
              BrainyBite.
            </Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 items-center justify-center px-8"
          >
            <div className="flex w-full max-w-lg items-center bg-slate-100 rounded-full border border-slate-200 px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all shadow-inner">
              {/* Dropdown */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none pr-2 py-1 border-r border-slate-300 cursor-pointer"
              >
                <option value="">ทุกหมวดหมู่</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* keyword */}
              <input
                type="text"
                placeholder="ค้นหาบทความ..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent px-4 py-1 text-sm text-slate-700 focus:outline-none placeholder-slate-400"
              />

              {/* buttom */}
              <button className="text-slate-400 hover:text-blue-600 transition-colors px-2">
                🔍
              </button>
            </div>
          </form>

          {/* Login / Register */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
