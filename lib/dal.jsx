import { readFile, writeFile } from "fs/promises";
import path from "path";

const USER_PATH = path.join(process.cwd(), "app/data/users.json");
const GRANT_PATH = path.join(process.cwd(), "app/data/grants.json");

async function readUsers() {
  try {
    const data = await readFile(USER_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await writeFile(USER_PATH, JSON.stringify(users, null, 2));
}

export async function upsertUser(profile) {
  const users = await readUsers();
  const now = new Date().toISOString();

  const clean = (val = "") =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const existing = users.find((u) => u.orcid === profile.orcid);

  const user = {
    id: profile.orcid,
    orcid: profile.orcid,
    email: profile.email || "",
    name: profile.name || "",
    institution: profile.university || "",
    research_interests: [profile.primaryField, profile.secondaryField].filter(
      Boolean
    ),
    grant_search_preferences: {
      location: profile.location || "",
      primary_research_field: profile.primaryField || "",
      secondary_research_field: profile.secondaryField || "",
      associated_university: profile.university || "",
      degrees: clean(profile.degrees),
      research_goals: clean(profile.goalsCsv),
    },
    updated: now,
    created: existing?.created || now,
  };

  const index = users.findIndex((u) => u.orcid === user.orcid);
  if (index >= 0) users[index] = user;
  else users.push(user);

  await writeUsers(users);
  return user;
}

export async function getUserByOrcid(orcid) {
  const users = await readUsers();
  return users.find((u) => u.orcid === orcid) || null;
}

export async function getTopGrants(limit = 10) {
  const raw = await readFile(GRANT_PATH, "utf-8");
  const all = JSON.parse(raw);

  return [...all]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export async function getGrantByID(grantID) {
  const raw = await readFile(GRANT_PATH, "utf-8");
  const data = JSON.parse(raw);
  const found = data.find((grants) => grants.id === grantID);
  return found;
}

export async function getGrants(filters = {}, limit = 40) {
  const raw = await readFile(GRANT_PATH, "utf-8");
  const all = JSON.parse(raw);

  const {
    amountMin = "",
    amountMax = "",
    category,
    funding,
    status = "",
    eligibilityMin = "",
    eligibilityMax = "",
    sort = "relevance",
  } = filters;

  const toArr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  let out = all.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, limit);

  const min = amountMin !== "" ? Number(amountMin) : null;
  const max = amountMax !== "" ? Number(amountMax) : null;
  if (min != null) out = out.filter((g) => Number(g.amount ?? 0) >= min);
  if (max != null) out = out.filter((g) => Number(g.amount ?? 0) <= max);

  const cats = toArr(category);
  if (cats.length)
    out = out.filter((g) => cats.includes(g.opportunity_category));

  const funds = toArr(funding);
  if (funds.length) out = out.filter((g) => funds.includes(g.funding_category));

  if (status) {
    const now = new Date();
    const s = status.toLowerCase();

    out = out.filter((g) => {
      const release = g.release_date ? new Date(g.release_date) : null;
      const deadline = g.deadline ? new Date(g.deadline) : null;

      if (!release || !deadline) return false;

      const isOpen = now >= release && now <= deadline;
      const isClosed = now > deadline;

      if (s === "open") return isOpen;
      if (s === "closed") return isClosed;
      return true;
    });
  }

  const eligMin = eligibilityMin !== "" ? Number(eligibilityMin) : null;
  const eligMax = eligibilityMax !== "" ? Number(eligibilityMax) : null;

  if (eligMin != null)
    out = out.filter(
      (g) => Number(String(g.eligibility ?? "").padStart(2, "0")) >= eligMin
    );

  if (eligMax != null)
    out = out.filter(
      (g) => Number(String(g.eligibility ?? "").padStart(2, "0")) <= eligMax
    );

  // sorting to be move please dont forget
  switch (sort) {
    case "deadline":
      out = [...out].sort(
        (a, b) => new Date(a.deadline || 0) - new Date(b.deadline || 0)
      );
      break;
    case "-amount":
      out = [...out].sort(
        (a, b) => Number(b.amount ?? 0) - Number(a.amount ?? 0)
      );
      break;
    case "amount":
      out = [...out].sort(
        (a, b) => Number(a.amount ?? 0) - Number(b.amount ?? 0)
      );
      break;
    default:
      out = [...out].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }

  return out;
}

export async function getSuggestedCollaborators() {
  const filePath = path.join(process.cwd(), "app/data/collaborators.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}
