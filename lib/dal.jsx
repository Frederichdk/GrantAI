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
    ...existing,
    orcid: profile.orcid,
    fullName: profile.name || "",
    email: profile.email || "",
    location: profile.location || "",
    university: profile.university || "",
    primaryField: profile.primaryField || "",
    secondaryField: profile.secondaryField || "",
    degrees: clean(profile.degrees),
    researchGoals: clean(profile.goalsCsv),
    updatedAt: now,
    createdAt: existing?.createdAt || now,
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
