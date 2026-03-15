import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/articleService";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Check the status when the webpage loads for the first time.
    checkUser();

    // the Hub listen for login/logout events to automatically change the UI.
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          checkUser();
          break;
        case "signedOut":
          setIsAuthenticated(false);
          setUserEmail("");
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(true);
      // Cognito usually returns a username as an email address or a UUID (User Identity Card)
      setUserEmail(user.username);
    } catch (error) {
      // If get an error, it means not logged in.
      setIsAuthenticated(false);
    }
  };

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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

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
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              // Login mode
              <>
                <Link
                  to="/write"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-full hover:bg-blue-100 transition-colors"
                >
                  เขียนบทความ
                </Link>
                {/* My Articles button (for future use on a profile page) */}
                <Link
                  to="/my-articles"
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  บทความของฉัน
                </Link>
                <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>{" "}
                {/* Line */}
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              // Normal mode (not logged in)
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 hover:shadow-md transition-all"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
