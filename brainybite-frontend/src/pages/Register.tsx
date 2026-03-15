import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //for OTP
  const [isConfirming, setIsConfirming] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // State for UI
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      return setErrorMsg("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
    }

    setIsLoading(true);
    try {
      // Amplify to create a new user in Cognito.
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email, // Indicate that email is used as the primary contact information.
          },
        },
      });
      // Registration successful, Switch to OTP entry mode.
      setIsConfirming(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      if (error.name === "UsernameExistsException") {
        setErrorMsg("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น");
      } else if (error.name === "InvalidPasswordException") {
        setErrorMsg(
          "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร มีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข",
        );
      } else {
        setErrorMsg("เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Click the button to confirm the OTP code from the email.
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      // Send the OTP code to verify with Cognito.
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode,
      });

      alert("ยืนยันอีเมลสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate("/login"); // Confirmation complete. Redirected to Login page.
    } catch (error: any) {
      console.error("Confirm error:", error);
      setErrorMsg("รหัสยืนยันไม่ถูกต้อง หรือหมดอายุแล้ว");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        {/* Switch UI based on State isConfirming */}
        {!isConfirming ? (
          // UI Registration Form
          <>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-2">
              สร้างบัญชีใหม่
            </h1>
            <p className="text-center text-slate-500 mb-8">
              มาร่วมแบ่งปันความรู้กับเรา
            </p>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  อีเมล (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  รหัสผ่าน (Password)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 transition-all shadow-md"
              >
                {isLoading ? "กำลังประมวลผล..." : "สมัครสมาชิกเลย"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              มีบัญชีอยู่แล้ว?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </>
        ) : (
          // UI for OTP verification form (email confirmation)
          <>
            <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-2">
              ยืนยันอีเมล ✉️
            </h1>
            <p className="text-center text-slate-500 mb-8">
              เราระบุรหัส 6 หลักไปที่ <br />
              <span className="font-bold text-slate-700">{email}</span>
            </p>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleConfirm} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  รหัสยืนยัน (Verification Code)
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full text-center tracking-widest text-2xl px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 rounded-xl text-white font-bold bg-green-600 hover:bg-green-700 disabled:bg-slate-400 transition-all shadow-md"
              >
                {isLoading ? "กำลังตรวจสอบ..." : "ยืนยันรหัส"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
