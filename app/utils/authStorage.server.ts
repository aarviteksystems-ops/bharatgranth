import fs from "fs";
import path from "path";
import crypto from "crypto";

const ENV_DIR = path.resolve(process.cwd(), ".env");
const USERS_FILE = path.join(ENV_DIR, "users.json"); // Actual signup data file
const HASH_FILE = path.join(ENV_DIR, "hashed_credentials.json"); // Dedicated hash file
const LOGS_FILE = path.join(ENV_DIR, "activity_logs.json"); // Activity logs file

// Salt/Pepper constants for cryptographic hashing
const HASH_SALT_CREDENTIALS = "bharatgranth_sacred_salt_2026";
const PASSWORD_PEPPER = "bg_secure_pass_pepper_9981";

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
 * Ensures the .env storage folder and data files exist
 */
function ensureStorage() {
  if (!fs.existsSync(ENV_DIR)) {
    fs.mkdirSync(ENV_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(HASH_FILE)) {
    fs.writeFileSync(HASH_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), "utf-8");
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
 * Read all actual signup users from .env/users.json
 */
export function readUsers(): StoredUser[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) as StoredUser[];
  } catch (err) {
    console.error("Error reading users from .env/users.json:", err);
    return [];
  }
}

/**
 * Write all actual users to .env/users.json
 */
export function writeUsers(users: StoredUser[]) {
  ensureStorage();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

/**
 * Read all hashed credentials from .env/hashed_credentials.json
 */
export function readHashedCredentials(): StoredHashedCredential[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(HASH_FILE, "utf-8");
    return JSON.parse(raw) as StoredHashedCredential[];
  } catch (err) {
    console.error("Error reading hashes from .env/hashed_credentials.json:", err);
    return [];
  }
}

/**
 * Write all hashed credentials to .env/hashed_credentials.json
 */
export function writeHashedCredentials(hashes: StoredHashedCredential[]) {
  ensureStorage();
  fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2), "utf-8");
}

/**
 * Read activity logs from .env/activity_logs.json
 */
export function readActivityLogs(): StoredActivityLog[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(LOGS_FILE, "utf-8");
    return JSON.parse(raw) as StoredActivityLog[];
  } catch (err) {
    console.error("Error reading activity logs from .env/activity_logs.json:", err);
    return [];
  }
}

/**
 * Append activity log to .env/activity_logs.json
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
  fs.writeFileSync(LOGS_FILE, JSON.stringify(logs.slice(0, 500), null, 2), "utf-8");
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

  const usernameHash = hashField(data.identifier, "username");
  const emailHash = hashField(data.identifier, "email");
  const phoneHash = hashField(data.identifier, "phone");
  const passwordHash = hashField(data.password, "password");

  // Authenticate by hash matching or direct match
  const hashIndex = hashes.findIndex(
    (h) =>
      (h.usernameHash === usernameHash || h.emailHash === emailHash || h.phoneHash === phoneHash) &&
      h.passwordHash === passwordHash
  );

  let userIndex = -1;
  if (hashIndex !== -1) {
    const matchedHashId = hashes[hashIndex].id;
    userIndex = users.findIndex((u) => u.id === matchedHashId);
  } else {
    // Direct match fallback
    userIndex = users.findIndex(
      (u) =>
        (u.username.toLowerCase() === data.identifier.toLowerCase().trim() ||
         u.email.toLowerCase() === data.identifier.toLowerCase().trim() ||
         u.phone === data.identifier.trim()) &&
        u.password === data.password
    );
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
  if (hashIndex !== -1) {
    hashes[hashIndex].lastLoginAt = now;
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
