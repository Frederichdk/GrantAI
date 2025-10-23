"use server";

import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "app/data/users.json");

async function readData() {
  try {
    const txt = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(txt);
  } catch {
    return [];
  }
}
async function writeData(users) {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
}

export async function completeOnboarding(profile) {
  const users = await readData();
  const now = new Date().toISOString();

  const user = {
    orcid: profile.orcid,
    fullName: profile.name || "",
    email: profile.email || "",
    location: profile.location || "",
    university: profile.university || "",
    primaryField: profile.primaryField || "",
    secondaryField: profile.secondaryField || "",
    degrees: (profile.degrees || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    researchGoals: (profile.goalsCsv || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    createdAt: now,
    updatedAt: now,
  };

  const i = users.findIndex((u) => u.orcid === user.orcid);
  if (i === -1) users.push(user);
  else users[i] = user;

  await writeData(users);
  return user;
}
