import { useState } from "react";
import { signIn } from "aws-amplify/auth"; // use Amplify V6 signIn
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Instruct Amplify to verify its identity with Cognito.
      const { isSignedIn } = await signIn({ username: email, password });

      if (isSignedIn) {
        alert("เข้าสู่ระบบสำเร็จ!");
        navigate("/"); // return home
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Manage error messages in a way that is easy for users to understand.
      if (error.name === "NotAuthorizedException") {
        setErrorMsg("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else if (error.name === "UserNotFoundException") {
        setErrorMsg("ไม่พบบัญชีผู้ใช้นี้ในระบบ");
      } else {
        setErrorMsg("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-2">
          เข้าสู่ระบบ
        </h1>
        <p className="text-center text-slate-500 mb-8">
          ยินดีต้อนรับกลับสู่ BrainyBite
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              อีเมล (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all shadow-md ${
              isLoading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          ยังไม่มีบัญชีใช่ไหม?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            สมัครสมาชิกเลย
          </Link>
        </p>
      </div>
    </div>
  );
}
