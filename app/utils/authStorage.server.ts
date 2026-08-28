import fs from "fs";
import path from "path";
import crypto from "crypto";
import os from "os";

// Determine safe storage directory (Vercel / Serverless uses os.tmpdir())
function getStorageDir(): string {
  const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  if (isVercel) {
    return path.join(os.tmpdir(), "bharatgranth_env");
  }
  
  // Try local .env directory
  const localDir = path.resolve(process.cwd(), ".env");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    // Fallback to OS temp directory if process.cwd() is read-only
    return path.join(os.tmpdir(), "bharatgranth_env");
  }
}

let ENV_DIR = getStorageDir();
let USERS_FILE = path.join(ENV_DIR, "users.json");
let HASH_FILE = path.join(ENV_DIR, "hashed_credentials.json");
let LOGS_FILE = path.join(ENV_DIR, "activity_logs.json");

// In-memory fallbacks to guarantee uptime even if filesystem operations fail
let memoryUsers: StoredUser[] = [];
let memoryHashes: StoredHashedCredential[] = [];
let memoryLogs: StoredActivityLog[] = [];

export interface StoredUser {
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

export interface StoredHashedCredential {
  id: string;
  usernameHash: string;
  emailHash: string;
  phoneHash: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: string;
  lastLoginAt: string;
}

export interface StoredActivityLog {
  id: string;
  userId: string;
  action: "SIGNUP" | "LOGIN" | "LOGOUT" | "LOGIN_FAILED";
  usernameHash: string;
  identifierUsed?: string;
  timestamp: string;
  status: "SUCCESS" | "FAILURE";
  ipHash?: string;
  userAgent?: string;
}

/**
 * Ensures the storage folder and data files exist safely (handles serverless read-only filesystems)
 */
function ensureStorage() {
  ENV_DIR = getStorageDir();
  USERS_FILE = path.join(ENV_DIR, "users.json");
  HASH_FILE = path.join(ENV_DIR, "hashed_credentials.json");
  LOGS_FILE = path.join(ENV_DIR, "activity_logs.json");

  try {
    if (!fs.existsSync(ENV_DIR)) {
      fs.mkdirSync(ENV_DIR, { recursive: true });
    }

    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(memoryUsers, null, 2), "utf-8");
    }

    if (!fs.existsSync(HASH_FILE)) {
      fs.writeFileSync(HASH_FILE, JSON.stringify(memoryHashes, null, 2), "utf-8");
    }

    if (!fs.existsSync(LOGS_FILE)) {
      fs.writeFileSync(LOGS_FILE, JSON.stringify(memoryLogs, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Storage filesystem warning (using memory storage fallback):", err);
  }
}

/**
 * Creates a deterministic SHA-256 hash for field matching
 */
export function hashField(value: string, fieldType: "username" | "email" | "phone" | "password"): string {
  const normalized = value.trim().toLowerCase();
  
  if (fieldType === "password") {
    return crypto
      .createHash("sha256")
      .update(value + PASSWORD_PEPPER + HASH_SALT_CREDENTIALS)
      .digest("hex");
  }

  return crypto
    .createHash("sha256")
    .update(`${fieldType}:${normalized}:${HASH_SALT_CREDENTIALS}`)
    .digest("hex");
}

/**
 * Generates a masked display name like "Ra***" or "Vi***"
 */
function generateDisplayHint(username: string): string {
  const clean = username.trim();
  if (clean.length <= 2) return clean;
  return clean.slice(0, 2) + "***" + clean.slice(-1);
}

/**
 * Read all actual signup users
 */
export function readUsers(): StoredUser[] {
  ensureStorage();
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoredUser[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryUsers = parsed;
      }
    }
  } catch (err) {
    console.error("Error reading users from storage:", err);
  }
  return memoryUsers;
}

/**
 * Write all actual users
 */
export function writeUsers(users: StoredUser[]) {
  memoryUsers = users;
  ensureStorage();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write users file to disk (memory saved):", err);
  }
}

/**
 * Read all hashed credentials
 */
export function readHashedCredentials(): StoredHashedCredential[] {
  ensureStorage();
  try {
    if (fs.existsSync(HASH_FILE)) {
      const raw = fs.readFileSync(HASH_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoredHashedCredential[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryHashes = parsed;
      }
    }
  } catch (err) {
    console.error("Error reading hashes from storage:", err);
  }
  return memoryHashes;
}

/**
 * Write all hashed credentials
 */
export function writeHashedCredentials(hashes: StoredHashedCredential[]) {
  memoryHashes = hashes;
  ensureStorage();
  try {
    fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write hashes file to disk (memory saved):", err);
  }
}

/**
 * Read activity logs
 */
export function readActivityLogs(): StoredActivityLog[] {
  ensureStorage();
  try {
    if (fs.existsSync(LOGS_FILE)) {
      const raw = fs.readFileSync(LOGS_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoredActivityLog[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLogs = parsed;
      }
    }
  } catch (err) {
    console.error("Error reading activity logs from storage:", err);
  }
  return memoryLogs;
}

/**
 * Append activity log
 */
export function logActivity(log: Omit<StoredActivityLog, "id" | "timestamp">) {
  ensureStorage();
  const logs = readActivityLogs();
  const newEntry: StoredActivityLog = {
    ...log,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };
  logs.unshift(newEntry);
  const trimmed = logs.slice(0, 500);
  memoryLogs = trimmed;
  try {
    fs.writeFileSync(LOGS_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write activity log to disk (memory saved):", err);
  }
}

/**
 * Registers a new user:
 * 1. Actual Signup data is stored in .env/users.json
 * 2. Hash codes are stored in separate .env/hashed_credentials.json
 * 3. Event is logged in .env/activity_logs.json
 */
export function registerUser(data: {
  username: string;
  email: string;
  phone: string;
  password: string;
  userAgent?: string;
}): { success: boolean; error?: string; user?: { id: string; displayHint: string; role: string } } {
  ensureStorage();
  const users = readUsers();
  const hashes = readHashedCredentials();

  const usernameHash = hashField(data.username, "username");
  const emailHash = hashField(data.email, "email");
  const phoneHash = hashField(data.phone, "phone");
  const passwordHash = hashField(data.password, "password");

  // Check if username or email already exists
  const existingUser = users.find(
    (u) =>
      u.username.toLowerCase() === data.username.toLowerCase().trim() ||
      u.email.toLowerCase() === data.email.toLowerCase().trim()
  );

  if (existingUser) {
    logActivity({
      userId: existingUser.id,
      action: "SIGNUP",
      usernameHash,
      identifierUsed: data.username,
      status: "FAILURE",
      userAgent: data.userAgent
    });
    return { success: false, error: "An account with this username or email already exists." };
  }

  const userId = "usr_" + crypto.randomUUID().slice(0, 12);
  const now = new Date().toISOString();
  
  // First registered user is automatically admin, rest are standard users
  const role: "user" | "admin" = users.length === 0 ? "admin" : "user";
  const displayHint = generateDisplayHint(data.username);

  // 1. Store Actual Input Data in .env/users.json
  const newUser: StoredUser = {
    id: userId,
    username: data.username.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    password: data.password,
    displayHint,
    role,
    createdAt: now,
    lastLoginAt: now,
    totalLogins: 1
  };

  users.push(newUser);
  writeUsers(users);

  // 2. Store Hash Codes in separate .env/hashed_credentials.json
  const newHashRecord: StoredHashedCredential = {
    id: userId,
    usernameHash,
    emailHash,
    phoneHash,
    passwordHash,
    role,
    createdAt: now,
    lastLoginAt: now
  };

  hashes.push(newHashRecord);
  writeHashedCredentials(hashes);

  // 3. Log Activity in .env/activity_logs.json
  logActivity({
    userId,
    action: "SIGNUP",
    usernameHash,
    identifierUsed: data.username,
    status: "SUCCESS",
    userAgent: data.userAgent
  });

  // 4. Sync signup to Google Sheet if GOOGLE_SHEET_WEBHOOK_URL is configured (non-blocking)
  syncSignupToGoogleSheet(newUser).catch((err) => console.error("Google Sheet background sync error:", err));

  return {
    success: true,
    user: {
      id: userId,
      displayHint,
      role
    }
  };
}

/**
 * Safely posts new signup data to configured Google Sheet Webhook URL in background
 */
export async function syncSignupToGoogleSheet(user: {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.trim()) {
    return { success: false, error: "GOOGLE_SHEET_WEBHOOK_URL is not set in .env.local" };
  }

  try {
    const res = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      redirect: "follow",
      body: JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      })
    });

    if (res.status === 401 || res.status === 403) {
      const err = "Google Access Denied (HTTP 401/403): In Google Apps Script, click Deploy > Manage deployments > Edit, and change 'Who has access' to 'Anyone'.";
      console.error(err);
      return { success: false, error: err };
    }

    if (res.status === 404) {
      const err = "Google Web App Not Found (HTTP 404): Please check the Web App URL in .env.local or deploy a New Deployment in Google Apps Script.";
      console.error(err);
      return { success: false, error: err };
    }

    const responseText = await res.text();

    if (responseText.includes("accounts.google.com") || responseText.includes("signin")) {
      const err = "Google Access Denied: In Google Apps Script, set 'Who has access' to 'Anyone' during deployment.";
      console.error(err);
      return { success: false, error: err };
    }

    if (responseText.includes("Page not found") || responseText.includes("unable to open the file")) {
      const err = "Google Sheet Error: Unable to open file. In Google Apps Script, set 'Who has access' to 'Anyone' and deploy a New Version.";
      console.error(err);
      return { success: false, error: err };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error syncing signup to Google Sheet:", err);
    return { success: false, error: err?.message || "Network error sending to Google Sheet." };
  }
}

/**
 * Authenticates user credentials using hash codes and updates both files
 */
export function authenticateUser(data: {
  identifier: string; // username, email, or phone
  password: string;
  userAgent?: string;
}): { success: boolean; error?: string; user?: { id: string; displayHint: string; role: string } } {
  ensureStorage();
  const users = readUsers();
  const hashes = readHashedCredentials();

  const cleanIdent = data.identifier.trim().toLowerCase();
  const usernameHash = hashField(data.identifier, "username");
  const emailHash = hashField(data.identifier, "email");
  const phoneHash = hashField(data.identifier, "phone");
  const passwordHash = hashField(data.password, "password");

  // 1. Direct match on users.json first
  let userIndex = users.findIndex(
    (u) =>
      (u.username.toLowerCase() === cleanIdent ||
       u.email.toLowerCase() === cleanIdent ||
       u.phone.trim() === data.identifier.trim()) &&
      u.password === data.password
  );

  // 2. Hash match fallback (only matching against active IDs in users.json)
  let matchedHashIndex = -1;
  if (userIndex === -1) {
    const validUserIds = new Set(users.map((u) => u.id));
    matchedHashIndex = hashes.findIndex(
      (h) =>
        validUserIds.has(h.id) &&
        (h.usernameHash === usernameHash || h.emailHash === emailHash || h.phoneHash === phoneHash) &&
        h.passwordHash === passwordHash
    );

    if (matchedHashIndex !== -1) {
      const matchedHashId = hashes[matchedHashIndex].id;
      userIndex = users.findIndex((u) => u.id === matchedHashId);
    }
  } else {
    matchedHashIndex = hashes.findIndex((h) => h.id === users[userIndex].id);
  }

  if (userIndex === -1) {
    logActivity({
      userId: "unknown",
      action: "LOGIN_FAILED",
      usernameHash,
      identifierUsed: data.identifier,
      status: "FAILURE",
      userAgent: data.userAgent
    });
    return { success: false, error: "Invalid username, email, or password." };
  }

  const now = new Date().toISOString();
  const user = users[userIndex];
  user.lastLoginAt = now;
  user.totalLogins = (user.totalLogins || 0) + 1;
  users[userIndex] = user;
  writeUsers(users);

  // Update hash file timestamps too
  if (matchedHashIndex !== -1) {
    hashes[matchedHashIndex].lastLoginAt = now;
    writeHashedCredentials(hashes);
  }

  logActivity({
    userId: user.id,
    action: "LOGIN",
    usernameHash: hashField(user.username, "username"),
    identifierUsed: data.identifier,
    status: "SUCCESS",
    userAgent: data.userAgent
  });

  return {
    success: true,
    user: {
      id: user.id,
      displayHint: user.displayHint,
      role: user.role
    }
  };
}

/**
 * Syncs ALL stored users from users.json to the configured Google Sheet
 */
export async function syncAllUsersToGoogleSheet(): Promise<{ success: boolean; syncedCount: number; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.trim()) {
    return { 
      success: false, 
      syncedCount: 0, 
      error: "GOOGLE_SHEET_WEBHOOK_URL environment variable is missing in .env.local or Vercel." 
    };
  }

  const users = readUsers();
  let syncedCount = 0;

  for (const user of users) {
    const res = await syncSignupToGoogleSheet(user);

    if (!res.success) {
      return {
        success: false,
        syncedCount,
        error: res.error || "Failed to sync signup data to Google Sheet."
      };
    }
    syncedCount++;
  }

  return { success: true, syncedCount };
}

