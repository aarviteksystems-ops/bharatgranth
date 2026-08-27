import { useState } from "react";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openLoginModal, openSignupModal, login, signup } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isAuthModalOpen) return null;

  // Sync mode with context
  if (authModalMode !== mode && (mode === "login" || mode === "signup")) {
    setMode(authModalMode);
  }

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleModeSwitch = (newMode: "login" | "signup") => {
    setMode(newMode);
    resetForm();
    if (newMode === "login") openLoginModal();
    else openSignupModal();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("Please fill in both your identifier and password.");
      return;
    }

    setLoading(true);
    const res = await login(username.trim(), password);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Login failed. Please verify your credentials.");
    } else {
      setSuccessMessage("Welcome back to BharatGranth! 🙏");
      setTimeout(() => {
        resetForm();
      }, 1000);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!username.trim() || !email.trim() || !password) {
      setErrorMessage("Username, Email, and Password are required.");
      return;
    }

    if (username.trim().length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await signup({
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password
    });
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Registration failed.");
    } else {
      setSuccessMessage("Account created successfully with full SHA-256 hash security! Welcome.");
      setTimeout(() => {
        resetForm();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      {/* Background Aura */}
      <div className="absolute inset-0 max-w-lg mx-auto my-auto h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-stone-950 p-5 border-b border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 flex items-center justify-center shadow-md shadow-amber-600/30">
              <span className="font-yatra text-stone-950 text-xl font-bold">ॐ</span>
            </div>
            <div>
              <h3 className="font-rozha text-lg text-gold-gradient leading-tight">
                {mode === "login" ? "सदस्य प्रवेश • Sign In" : "नया खाता • Create Account"}
              </h3>
              <p className="font-cinzel text-[10px] text-amber-400/80 tracking-wider">
                BHARATGRANTH SACRED PORTAL
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              closeAuthModal();
            }}
            className="text-stone-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-stone-800/60 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-amber-900/30 bg-stone-950/40">
          <button
            type="button"
            onClick={() => handleModeSwitch("login")}
            className={`flex-1 py-3 text-xs font-cinzel font-semibold tracking-wider transition ${
              mode === "login"
                ? "text-amber-400 border-b-2 border-amber-500 bg-amber-950/20"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("signup")}
            className={`flex-1 py-3 text-xs font-cinzel font-semibold tracking-wider transition ${
              mode === "signup"
                ? "text-amber-400 border-b-2 border-amber-500 bg-amber-950/20"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Security Notice */}
          <div className="flex items-start gap-2.5 p-2.5 bg-amber-950/20 border border-amber-900/40 rounded-xl text-stone-300 text-[11px] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-amber-300 font-medium">Cryptographic Hash Security:</strong> All data (Username, Email, Phone & Password) is saved strictly in SHA-256 hash codes inside <code className="text-amber-300">.env/</code>.
            </span>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-red-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-cinzel text-[11px] text-stone-300 mb-1.5">
                  USERNAME, EMAIL, OR PHONE
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your registered username or email"
                    className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                    required
                  />
                  <User className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-[11px] text-stone-300 mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2.5 pl-10 pr-10 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                    required
                  />
                  <Lock className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-cinzel font-bold text-xs tracking-wider rounded-xl shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    SIGN IN TO BHARATGRANTH
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block font-cinzel text-[11px] text-stone-300 mb-1">
                  USERNAME <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                    required
                  />
                  <User className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-[11px] text-stone-300 mb-1">
                  EMAIL ADDRESS <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                    required
                  />
                  <Mail className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-[11px] text-stone-300 mb-1">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                  />
                  <Phone className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel text-[11px] text-stone-300 mb-1">
                    PASSWORD <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                      required
                    />
                    <Lock className="w-3.5 h-3.5 text-amber-500/70 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block font-cinzel text-[11px] text-stone-300 mb-1">
                    CONFIRM PASSWORD <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-stone-950/70 border border-amber-900/40 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
                      required
                    />
                    <Lock className="w-3.5 h-3.5 text-amber-500/70 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-cinzel font-bold text-xs tracking-wider rounded-xl shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    CREATING HASHED ACCOUNT...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    CREATE HASHED ACCOUNT
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch Prompt */}
          <div className="pt-2 text-center text-xs text-stone-400">
            {mode === "login" ? (
              <p>
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => handleModeSwitch("signup")}
                  className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 ml-1"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleModeSwitch("login")}
                  className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 ml-1"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
