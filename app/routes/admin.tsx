import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Shield, 
  Users, 
  Activity, 
  Database, 
  Key, 
  Search, 
  Download, 
  RefreshCw, 
  Lock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Calendar,
  FileCode,
  Layers,
  Eye,
  EyeOff,
  Hash,
  FileText,
  FileSpreadsheet
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface StoredUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  displayHint: string;
  role: "user" | "admin";
  createdAt: string;
  lastLoginAt: string;
  totalLogins: number;
}

interface StoredHashedCredential {
  id: string;
  usernameHash: string;
  emailHash: string;
  phoneHash: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: string;
  lastLoginAt: string;
}

interface StoredLog {
  id: string;
  userId: string;
  action: "SIGNUP" | "LOGIN" | "LOGOUT" | "LOGIN_FAILED";
  usernameHash: string;
  identifierUsed?: string;
  timestamp: string;
  status: "SUCCESS" | "FAILURE";
  userAgent?: string;
}

export function meta() {
  return [
    { title: "Admin Portal • BharatGranth User & Auth Storage" },
    { name: "description", content: "BharatGranth Administrator Database & Hashed Credential Logs" },
  ];
}

export default function AdminPage() {
  const { user } = useAuth();
  const [adminPasskey, setAdminPasskey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState("");

  const [activeTab, setActiveTab] = useState<"users" | "hashes" | "logs">("users");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<StoredUser[]>([]);
  const [hashes, setHashes] = useState<StoredHashedCredential[]>([]);
  const [logs, setLogs] = useState<StoredLog[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalHashes: 0, totalLogs: 0, adminCount: 0 });

  const [syncingSheets, setSyncingSheets] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ message?: string; error?: string }>({});

  const handleSyncGoogleSheets = async () => {
    setSyncingSheets(true);
    setSyncStatus({});
    try {
      const activeKey = adminPasskey.trim() || (user?.role === "admin" ? "admin123" : "");
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Passkey": activeKey
        },
        body: JSON.stringify({ actionType: "sync-sheets" })
      });
      const data = await res.json();
      if (data.success) {
        setSyncStatus({ message: data.message });
      } else {
        setSyncStatus({ error: data.error || "Failed to sync to Google Sheet." });
      }
    } catch (e) {
      setSyncStatus({ error: "Failed to communicate with sync server." });
    } finally {
      setSyncingSheets(false);
    }
  };

  // Auto-unlock if logged-in user is admin
  useEffect(() => {
    if (user && user.role === "admin") {
      setIsUnlocked(true);
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const activeKey = adminPasskey.trim() || (user?.role === "admin" ? "admin123" : "");
      const res = await fetch("/api/auth?type=admin-data", {
        headers: {
          "X-Admin-Passkey": activeKey
        }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        setHashes(data.hashes || []);
        setLogs(data.logs || []);
        setStats(data.stats || { totalUsers: 0, totalHashes: 0, totalLogs: 0, adminCount: 0 });
      } else {
        setPassError(data.error || "Access Denied.");
        setIsUnlocked(false);
      }
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchData();
    }
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey.trim() === "admin123" || adminPasskey.trim() === "bharatgranth2026" || (user && user.role === "admin")) {
      setIsUnlocked(true);
      setPassError("");
    } else {
      setPassError("Invalid admin passkey. Please try again.");
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ users, hashes, logs, exportedAt: new Date().toISOString() }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bharatgranth_storage_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.id.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.displayHint.toLowerCase().includes(q)
    );
  });

  const filteredHashes = hashes.filter((h) => {
    const q = searchQuery.toLowerCase();
    return (
      h.id.toLowerCase().includes(q) ||
      h.usernameHash.toLowerCase().includes(q) ||
      h.emailHash.toLowerCase().includes(q) ||
      h.phoneHash.toLowerCase().includes(q) ||
      h.passwordHash.toLowerCase().includes(q)
    );
  });

  const filteredLogs = logs.filter((l) => {
    const q = searchQuery.toLowerCase();
    return (
      l.action.toLowerCase().includes(q) ||
      l.userId.toLowerCase().includes(q) ||
      l.usernameHash.toLowerCase().includes(q) ||
      (l.identifierUsed && l.identifierUsed.toLowerCase().includes(q))
    );
  });

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 pt-28 pb-16">
        <div className="w-full max-w-md bg-stone-900/90 border border-amber-900/50 rounded-2xl p-8 shadow-2xl backdrop-blur-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-600/30">
            <Lock className="w-8 h-8 text-stone-950" />
          </div>

          <h2 className="font-rozha text-2xl text-gold-gradient mb-1">
            Admin Database Access
          </h2>
          <p className="font-cinzel text-xs text-amber-400/80 mb-6 tracking-wider">
            BHARATGRANTH STORAGE REPOSITORY (.ENV FOLDER)
          </p>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <div>
              <label className="block font-cinzel text-xs text-stone-300 mb-1.5">
                ENTER ADMIN PASSKEY
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminPasskey}
                  onChange={(e) => setAdminPasskey(e.target.value)}
                  placeholder="Enter administrator passkey"
                  className="w-full bg-stone-950/80 border border-amber-900/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                  required
                />
                <Key className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Default Master Passkey: <code className="text-amber-400">admin123</code>
              </p>
            </div>

            {passError && (
              <p className="text-red-400 text-xs bg-red-950/40 p-2.5 border border-red-900/40 rounded-xl">
                {passError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-cinzel font-bold text-xs tracking-wider rounded-xl shadow-lg shadow-amber-600/20 transition cursor-pointer"
            >
              UNLOCK ADMIN DATA VIEWER
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-amber-900/30">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navigation & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-900/30">
          <div>
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-400 border border-amber-900/30 transition">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-rozha text-3xl text-gold-gradient">
                  Admin User & Storage Portal
                </h1>
                <p className="font-cinzel text-xs text-amber-400/80 tracking-wider">
                  STORED IN <code className="text-amber-300 font-mono">.env/users.json</code> & <code className="text-amber-300 font-mono">.env/hashed_credentials.json</code> & <code className="text-amber-300 font-mono">.env/activity_logs.json</code>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncGoogleSheets}
              disabled={syncingSheets}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 rounded-xl text-xs font-cinzel text-emerald-300 hover:text-emerald-100 transition cursor-pointer disabled:opacity-50"
            >
              <FileSpreadsheet className={`w-3.5 h-3.5 ${syncingSheets ? "animate-spin" : ""}`} />
              {syncingSheets ? "SYNCING..." : "SYNC TO GOOGLE SHEET"}
            </button>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-xl text-xs font-cinzel text-stone-300 hover:text-amber-400 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              REFRESH DATA
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-cinzel font-bold text-xs rounded-xl shadow-md shadow-amber-600/20 transition"
            >
              <Download className="w-3.5 h-3.5" />
              EXPORT ALL DATA
            </button>
          </div>
        </div>

        {syncStatus.message && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-xs font-sans text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncStatus.message}</span>
          </div>
        )}

        {syncStatus.error && (
          <div className="p-4 bg-red-950/60 border border-red-700/50 rounded-xl text-xs font-sans text-red-300 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{syncStatus.error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-stone-900/70 border border-amber-900/40 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel text-xs text-stone-400">ACTUAL SIGNUP USERS</span>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-bold font-rozha text-amber-300">{stats.totalUsers}</div>
            <p className="text-[11px] text-stone-400 mt-1">Stored in .env/users.json</p>
          </div>

          <div className="bg-stone-900/70 border border-amber-900/40 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel text-xs text-stone-400">HASHED CREDENTIALS</span>
              <Hash className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold font-rozha text-emerald-300">{stats.totalHashes}</div>
            <p className="text-[11px] text-stone-400 mt-1">Stored in .env/hashed_credentials.json</p>
          </div>

          <div className="bg-stone-900/70 border border-amber-900/40 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel text-xs text-stone-400">ACTIVITY LOGS</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold font-rozha text-cyan-300">{stats.totalLogs}</div>
            <p className="text-[11px] text-stone-400 mt-1">Stored in .env/activity_logs.json</p>
          </div>

          <div className="bg-stone-900/70 border border-amber-900/40 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel text-xs text-stone-400">ADMIN ACCOUNTS</span>
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold font-rozha text-purple-300">{stats.adminCount}</div>
            <p className="text-[11px] text-stone-400 mt-1">Elevated privilege accounts</p>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-900/60 border border-amber-900/40 rounded-2xl p-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-xs font-bold transition ${
                activeTab === "users"
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
              }`}
            >
              <FileText className="w-4 h-4" />
              1. ACTUAL USERS (.env/users.json) ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("hashes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-xs font-bold transition ${
                activeTab === "hashes"
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
              }`}
            >
              <Hash className="w-4 h-4" />
              2. HASH CREDENTIALS (.env/hashed_credentials.json) ({hashes.length})
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-xs font-bold transition ${
                activeTab === "logs"
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
              }`}
            >
              <Activity className="w-4 h-4" />
              3. ACTIVITY LOGS (.env/activity_logs.json) ({logs.length})
            </button>
          </div>

          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in table..."
              className="w-full bg-stone-950/90 border border-amber-900/40 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-amber-500/70 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* TAB 1: ACTUAL USERS FILE (.env/users.json) */}
        {activeTab === "users" && (
          <div className="bg-stone-900/80 border border-amber-900/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-stone-950/80 border-b border-amber-900/30 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-amber-400">
                FILE: <code className="font-mono text-amber-300">.env/users.json</code> (ACTUAL USER SIGNUP DATA)
              </span>
              <span className="text-[11px] text-stone-400">
                Total Records: {filteredUsers.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 text-amber-400 font-cinzel uppercase tracking-wider border-b border-amber-900/40">
                  <tr>
                    <th className="py-3.5 px-4">User ID</th>
                    <th className="py-3.5 px-4">Actual Username</th>
                    <th className="py-3.5 px-4">Actual Email</th>
                    <th className="py-3.5 px-4">Actual Phone</th>
                    <th className="py-3.5 px-4">Actual Password</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Registered On</th>
                    <th className="py-3.5 px-4">Logins</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-stone-400">
                        No registered users found in .env/users.json
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-800/40 transition">
                        <td className="py-3.5 px-4 text-amber-300 font-mono font-semibold">{u.id}</td>
                        <td className="py-3.5 px-4 text-stone-100 font-medium">{u.username}</td>
                        <td className="py-3.5 px-4 text-cyan-300 font-mono">{u.email}</td>
                        <td className="py-3.5 px-4 text-emerald-300 font-mono">{u.phone || "—"}</td>
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-stone-200">
                              {showPasswords[u.id] ? u.password : "••••••••"}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(u.id)}
                              className="text-stone-400 hover:text-amber-400 cursor-pointer"
                              title="Toggle password reveal"
                            >
                              {showPasswords[u.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-purple-950 text-purple-300 border border-purple-800/50"
                              : "bg-stone-800 text-stone-300"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-400 font-sans text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-amber-400">
                          {u.totalLogins}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: HASHED CREDENTIALS FILE (.env/hashed_credentials.json) */}
        {activeTab === "hashes" && (
          <div className="bg-stone-900/80 border border-amber-900/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-stone-950/80 border-b border-amber-900/30 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-amber-400">
                FILE: <code className="font-mono text-amber-300">.env/hashed_credentials.json</code> (DEDICATED SHA-256 HASH DATA)
              </span>
              <span className="text-[11px] text-stone-400">
                Total Hashes: {filteredHashes.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 text-amber-400 font-cinzel uppercase tracking-wider border-b border-amber-900/40">
                  <tr>
                    <th className="py-3.5 px-4">User ID</th>
                    <th className="py-3.5 px-4">Username Hash (SHA-256)</th>
                    <th className="py-3.5 px-4">Email Hash (SHA-256)</th>
                    <th className="py-3.5 px-4">Phone Hash (SHA-256)</th>
                    <th className="py-3.5 px-4">Password Hash (SHA-256)</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20">
                  {filteredHashes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        No records found in .env/hashed_credentials.json
                      </td>
                    </tr>
                  ) : (
                    filteredHashes.map((h) => (
                      <tr key={h.id} className="hover:bg-stone-800/40 transition font-mono">
                        <td className="py-3.5 px-4 text-amber-300 font-semibold">{h.id}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-stone-950 px-2 py-1 rounded border border-amber-900/30 text-amber-400 text-[11px]" title={h.usernameHash}>
                            {h.usernameHash.slice(0, 14)}...
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-stone-950 px-2 py-1 rounded border border-amber-900/30 text-cyan-400 text-[11px]" title={h.emailHash}>
                            {h.emailHash.slice(0, 14)}...
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-stone-950 px-2 py-1 rounded border border-amber-900/30 text-emerald-400 text-[11px]" title={h.phoneHash}>
                            {h.phoneHash.slice(0, 14)}...
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-stone-950 px-2 py-1 rounded border border-amber-900/30 text-red-400 text-[11px]" title={h.passwordHash}>
                            {h.passwordHash.slice(0, 14)}...
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider ${
                            h.role === "admin"
                              ? "bg-purple-950 text-purple-300 border border-purple-800/50"
                              : "bg-stone-800 text-stone-300"
                          }`}>
                            {h.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-400 font-sans text-[11px]">
                          {new Date(h.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY LOGS FILE (.env/activity_logs.json) */}
        {activeTab === "logs" && (
          <div className="bg-stone-900/80 border border-amber-900/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-stone-950/80 border-b border-amber-900/30 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-amber-400">
                FILE: <code className="font-mono text-amber-300">.env/activity_logs.json</code> (AUDIT LOGS)
              </span>
              <span className="text-[11px] text-stone-400">
                Total Logs: {filteredLogs.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 text-amber-400 font-cinzel uppercase tracking-wider border-b border-amber-900/40">
                  <tr>
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4">Action</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">User ID</th>
                    <th className="py-3.5 px-4">Identifier Used</th>
                    <th className="py-3.5 px-4">Username Hash</th>
                    <th className="py-3.5 px-4">User Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/20">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        No activity logs recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((l) => (
                      <tr key={l.id} className="hover:bg-stone-800/40 transition">
                        <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                          {new Date(l.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                            l.action === "SIGNUP"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                              : l.action === "LOGIN"
                              ? "bg-cyan-950 text-cyan-300 border border-cyan-800/50"
                              : l.action === "LOGOUT"
                              ? "bg-amber-950 text-amber-300 border border-amber-800/50"
                              : "bg-red-950 text-red-300 border border-red-800/50"
                          }`}>
                            {l.action}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {l.status === "SUCCESS" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                              <CheckCircle className="w-3.5 h-3.5" /> SUCCESS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                              <XCircle className="w-3.5 h-3.5" /> FAILURE
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-amber-300">{l.userId}</td>
                        <td className="py-3.5 px-4 font-sans text-stone-200 font-medium">
                          {l.identifierUsed || "—"}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-400 text-[11px]">
                          {l.usernameHash.slice(0, 16)}...
                        </td>
                        <td className="py-3.5 px-4 text-stone-400 text-[11px] max-w-xs truncate" title={l.userAgent}>
                          {l.userAgent}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
