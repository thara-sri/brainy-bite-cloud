import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Navbar from "./components/Navbar"; // Import Navbar
import WriteArticle from "./pages/WriteArticle";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/write" element={<WriteArticle />} />
          <Route path="/edit/:slug" element={<EditArticle />} />
          <Route
            path="/login"
            element={
              <div className="p-8 text-center text-xl">
                หน้า Login กำลังสร้าง...{" "}
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="p-8 text-center text-xl">
                หน้า Register กำลังสร้าง...{" "}
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
