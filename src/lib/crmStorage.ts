// Shared CRM Lead Storage Helper
// Syncs real messages submitted via the Contact Us section & Hire Me modal directly into the CRM Dashboard.

export interface CrmLead {
  id: string;
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  timestamp: string;
}

const STORAGE_KEY = "ayush_crm_inbound_leads";

export function getCrmLeads(): CrmLead[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return [];
}

export function saveCrmLead(lead: Omit<CrmLead, "id" | "timestamp" | "status">): CrmLead {
  const existing = getCrmLeads();
  const nextIdNumber = 1001 + existing.length;
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const newLead: CrmLead = {
    ...lead,
    id: `MSG-${nextIdNumber}`,
    status: "NEW",
    timestamp: formattedTime,
  };

  const updated = [newLead, ...existing];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return newLead;
}

export function updateCrmLeadStatus(id: string, status: CrmLead["status"]): CrmLead[] {
  const existing = getCrmLeads();
  const updated = existing.map((l) => (l.id === id ? { ...l, status } : l));
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return updated;
}

export function deleteCrmLead(id: string): CrmLead[] {
  const existing = getCrmLeads();
  const updated = existing.filter((l) => l.id !== id);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
  return updated;
}
