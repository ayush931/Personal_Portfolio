import fs from "fs";
import path from "path";

export interface CrmMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  status: "unread" | "read" | "replied";
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  path: string;
  userAgent: string;
  device: string;
  referrer: string;
}

export interface CrmStoreData {
  messages: CrmMessage[];
  visitors: VisitorLog[];
}

const STORAGE_PATH = path.join(process.cwd(), "data", "crm_data.json");

// Initial Seed Data if empty
const initialData: CrmStoreData = {
  messages: [
    {
      id: "msg-101",
      name: "Alex Rivera",
      email: "alex.rivera@techcorp.io",
      subject: "Senior Full-Stack Engineer Opportunity",
      message: "Hi Ayush, impressed by your work on DocStream and Aetheria. We have an open Senior Full-Stack role for high-throughput microservices. Would love to connect!",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      ip: "157.240.22.18",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/122.0.0.0",
      status: "unread",
    },
    {
      id: "msg-102",
      name: "Priya Sharma",
      email: "priya.sharma@innovate.co.in",
      subject: "Consulting Inquiry - Microservice Architecture",
      message: "Hello Ayush, we are migrating our monolith to FastAPI & Celery. Are you available for freelance technical consultation next month?",
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      ip: "103.21.244.11",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/122.0.0.0",
      status: "read",
    },
  ],
  visitors: [
    {
      id: "vis-1",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      ip: "157.240.22.18",
      path: "/",
      userAgent: "Chrome 122.0 / macOS",
      device: "Desktop",
      referrer: "https://linkedin.com",
    },
    {
      id: "vis-2",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      ip: "103.21.244.11",
      path: "/#work",
      userAgent: "Edge 122.0 / Windows",
      device: "Desktop",
      referrer: "https://github.com/ayush931",
    },
    {
      id: "vis-3",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      ip: "49.37.18.90",
      path: "/",
      userAgent: "Safari 17.2 / iPhone",
      device: "Mobile",
      referrer: "Direct",
    },
  ],
};

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function readCrmStore(): CrmStoreData {
  try {
    ensureDirectoryExists(STORAGE_PATH);
    if (!fs.existsSync(STORAGE_PATH)) {
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
    return JSON.parse(raw) as CrmStoreData;
  } catch {
    return initialData;
  }
}

export function writeCrmStore(data: CrmStoreData): void {
  try {
    ensureDirectoryExists(STORAGE_PATH);
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[CRM Store] Failed to write storage file:", err);
  }
}

export function addCrmMessage(msg: Omit<CrmMessage, "id" | "timestamp" | "status">): CrmMessage {
  const store = readCrmStore();
  const newMessage: CrmMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: "unread",
  };
  store.messages.unshift(newMessage);
  writeCrmStore(store);
  return newMessage;
}

export function addVisitorLog(log: Omit<VisitorLog, "id" | "timestamp">): VisitorLog {
  const store = readCrmStore();
  const newLog: VisitorLog = {
    ...log,
    id: `vis-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  store.visitors.unshift(newLog);
  // Keep last 500 visitor logs
  if (store.visitors.length > 500) {
    store.visitors = store.visitors.slice(0, 500);
  }
  writeCrmStore(store);
  return newLog;
}

export function updateMessageStatus(id: string, status: "unread" | "read" | "replied"): boolean {
  const store = readCrmStore();
  const target = store.messages.find((m) => m.id === id);
  if (!target) return false;
  target.status = status;
  writeCrmStore(store);
  return true;
}

export function deleteCrmMessage(id: string): boolean {
  const store = readCrmStore();
  const initialLen = store.messages.length;
  store.messages = store.messages.filter((m) => m.id !== id);
  if (store.messages.length !== initialLen) {
    writeCrmStore(store);
    return true;
  }
  return false;
}
