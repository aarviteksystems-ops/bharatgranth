import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { 
  registerUser, 
  authenticateUser, 
  readUsers, 
  readHashedCredentials,
  readActivityLogs,
  logActivity 
} from "../utils/authStorage.server";

const ADMIN_MASTER_KEYS = ["admin123", "bharatgranth2026"];

function verifyAdminAccess(request: Request): boolean {
  const url = new URL(request.url);
  const authHeader = request.headers.get("X-Admin-Passkey") || request.headers.get("Authorization");
  const queryKey = url.searchParams.get("adminKey");
  const candidate = (authHeader || queryKey || "").replace("Bearer ", "").trim();

  return ADMIN_MASTER_KEYS.includes(candidate);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  if (type === "admin-data") {
    // Strict Access Control: users.json and full credentials are for verified Admins ONLY
    if (!verifyAdminAccess(request)) {
      logActivity({
        userId: "unauthorized_probe",
        action: "LOGIN_FAILED",
        usernameHash: "UNAUTHORIZED_ADMIN_DATA_ACCESS_ATTEMPT",
        identifierUsed: request.headers.get("user-agent") || "unknown",
        status: "FAILURE",
        userAgent: request.headers.get("user-agent") || "unknown"
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: "ACCESS DENIED: users.json is strictly confidential and restricted to authorized Admins only."
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return actual users, hashed credentials, and logs ONLY to verified admin
    const users = readUsers();
    const hashes = readHashedCredentials();
    const logs = readActivityLogs();
    return Response.json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalHashes: hashes.length,
        totalLogs: logs.length,
        adminCount: users.filter((u) => u.role === "admin").length
      },
      users,
      hashes,
      logs
    });
  }

  return Response.json({ message: "BharatGranth Authentication API is active." });
}

export async function action({ request }: ActionFunctionArgs) {
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const body = await request.json();
    const { actionType } = body;

    if (actionType === "signup") {
      const { username, email, phone, password } = body;

      if (!username || !email || !password) {
        return Response.json(
          { success: false, error: "Username, email, and password are required." },
          { status: 400 }
        );
      }

      if (username.length < 3) {
        return Response.json(
          { success: false, error: "Username must be at least 3 characters long." },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return Response.json(
          { success: false, error: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const result = registerUser({
        username,
        email,
        phone: phone || "",
        password,
        userAgent
      });

      if (!result.success) {
        return Response.json({ success: false, error: result.error }, { status: 400 });
      }

      return Response.json({
        success: true,
        message: "Account created successfully with full credential hashing.",
        user: result.user
      });
    }

    if (actionType === "login") {
      const { identifier, password } = body;

      if (!identifier || !password) {
        return Response.json(
          { success: false, error: "Please enter your username/email and password." },
          { status: 400 }
        );
      }

      const result = authenticateUser({
        identifier,
        password,
        userAgent
      });

      if (!result.success) {
        return Response.json({ success: false, error: result.error }, { status: 401 });
      }

      return Response.json({
        success: true,
        message: "Login successful.",
        user: result.user
      });
    }

    if (actionType === "logout") {
      const { userId, usernameHash } = body;
      if (userId) {
        logActivity({
          userId,
          action: "LOGOUT",
          usernameHash: usernameHash || "user",
          status: "SUCCESS",
          userAgent
        });
      }
      return Response.json({ success: true, message: "Logged out successfully." });
    }

    return Response.json({ success: false, error: "Unknown action." }, { status: 400 });
  } catch (err: any) {
    console.error("Auth action error:", err);
    return Response.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
