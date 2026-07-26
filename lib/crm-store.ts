import fs from "fs";
import path from "path";
import { revalidatePath, unstable_cache } from "next/cache";
import { prisma } from "./prisma";

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

const initialData: CrmStoreData = {
  messages: [],
  visitors: [],
};

function readLocalJsonStore(): CrmStoreData {
  try {
    if (!fs.existsSync(STORAGE_PATH)) {
      const dirname = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
    return JSON.parse(raw) as CrmStoreData;
  } catch {
    return initialData;
  }
}

function writeLocalJsonStore(data: CrmStoreData): void {
  try {
    const dirname = path.dirname(STORAGE_PATH);
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[CRM File Write Error]:", err);
  }
}

async function fetchCrmStoreFromDb(): Promise<CrmStoreData> {
  try {
    const [dbMessages, dbVisitors] = await Promise.all([
      prisma.crmMessage.findMany({ orderBy: { timestamp: "desc" } }),
      prisma.visitorLog.findMany({ orderBy: { timestamp: "desc" }, take: 500 }),
    ]);

    if (dbMessages.length === 0 && dbVisitors.length === 0) {
      // Seed DB with initial telemetry
      await Promise.all([
        ...initialData.messages.map((m) =>
          prisma.crmMessage.create({
            data: {
              id: m.id,
              name: m.name,
              email: m.email,
              subject: m.subject,
              message: m.message,
              timestamp: new Date(m.timestamp),
              ip: m.ip,
              userAgent: m.userAgent,
              status: m.status,
            },
          })
        ),
        ...initialData.visitors.map((v) =>
          prisma.visitorLog.create({
            data: {
              id: v.id,
              timestamp: new Date(v.timestamp),
              ip: v.ip,
              path: v.path,
              userAgent: v.userAgent,
              device: v.device,
              referrer: v.referrer,
            },
          })
        ),
      ]);
      return initialData;
    }

    return {
      messages: dbMessages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        timestamp: m.timestamp.toISOString(),
        ip: m.ip,
        userAgent: m.userAgent,
        status: m.status as "unread" | "read" | "replied",
      })),
      visitors: dbVisitors.map((v) => ({
        id: v.id,
        timestamp: v.timestamp.toISOString(),
        ip: v.ip,
        path: v.path,
        userAgent: v.userAgent,
        device: v.device,
        referrer: v.referrer,
      })),
    };
  } catch {
    return readLocalJsonStore();
  }
}

export const getCachedCrmStore = unstable_cache(
  async () => fetchCrmStoreFromDb(),
  ["crm-store-data-cache"],
  {
    revalidate: 60,
    tags: ["crm-telemetry"],
  }
);

export async function readCrmStore(): Promise<CrmStoreData> {
  return getCachedCrmStore();
}

export async function addCrmMessage(
  msg: Omit<CrmMessage, "id" | "timestamp" | "status">
): Promise<CrmMessage> {
  let created: CrmMessage;
  try {
    const dbMsg = await prisma.crmMessage.create({
      data: {
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        ip: msg.ip,
        userAgent: msg.userAgent,
        status: "unread",
      },
    });

    created = {
      id: dbMsg.id,
      name: dbMsg.name,
      email: dbMsg.email,
      subject: dbMsg.subject,
      message: dbMsg.message,
      timestamp: dbMsg.timestamp.toISOString(),
      ip: dbMsg.ip,
      userAgent: dbMsg.userAgent,
      status: dbMsg.status as "unread" | "read" | "replied",
    };
  } catch {
    const store = readLocalJsonStore();
    created = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "unread",
    };
    store.messages.unshift(created);
    writeLocalJsonStore(store);
  }

  try {
    revalidatePath("/crm");
  } catch (e) {
    // Ignore in non-server action contexts
  }

  return created;
}

export async function addVisitorLog(
  log: Omit<VisitorLog, "id" | "timestamp">
): Promise<VisitorLog> {
  let created: VisitorLog;
  try {
    const dbLog = await prisma.visitorLog.create({
      data: {
        ip: log.ip,
        path: log.path,
        userAgent: log.userAgent,
        device: log.device,
        referrer: log.referrer,
      },
    });

    created = {
      id: dbLog.id,
      timestamp: dbLog.timestamp.toISOString(),
      ip: dbLog.ip,
      path: dbLog.path,
      userAgent: dbLog.userAgent,
      device: dbLog.device,
      referrer: dbLog.referrer,
    };
  } catch {
    const store = readLocalJsonStore();
    created = {
      ...log,
      id: `vis-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    store.visitors.unshift(created);
    if (store.visitors.length > 500) store.visitors = store.visitors.slice(0, 500);
    writeLocalJsonStore(store);
  }

  try {
    revalidatePath("/crm");
  } catch (e) {
    // Ignore in non-server action contexts
  }

  return created;
}

export async function updateMessageStatus(
  id: string,
  status: "unread" | "read" | "replied"
): Promise<boolean> {
  let ok = false;
  try {
    await prisma.crmMessage.update({
      where: { id },
      data: { status },
    });
    ok = true;
  } catch {
    const store = readLocalJsonStore();
    const target = store.messages.find((m) => m.id === id);
    if (target) {
      target.status = status;
      writeLocalJsonStore(store);
      ok = true;
    }
  }

  try {
    revalidatePath("/crm");
  } catch (e) {
    // Ignore in non-server action contexts
  }

  return ok;
}

export async function deleteCrmMessage(id: string): Promise<boolean> {
  let ok = false;
  try {
    await prisma.crmMessage.delete({ where: { id } });
    ok = true;
  } catch {
    const store = readLocalJsonStore();
    const len = store.messages.length;
    store.messages = store.messages.filter((m) => m.id !== id);
    if (store.messages.length !== len) {
      writeLocalJsonStore(store);
      ok = true;
    }
  }

  try {
    revalidatePath("/crm");
  } catch (e) {
    // Ignore in non-server action contexts
  }

  return ok;
}
