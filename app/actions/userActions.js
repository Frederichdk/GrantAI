"use server";

import { upsertUser, getUserByOrcid } from "@/lib/dal";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/;

export async function completeOnboardingAction(formData) {
  const data = Object.fromEntries(formData);
  if (!ORCID_REGEX.test(data.orcid || "")) {
    throw new Error("Invalid ORCID format");
  }
  const user = await upsertUser(data);

  const jar = await cookies();
  jar.set("orcid", user.orcid);
  redirect("/");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete("orcid");
  redirect("/signup");
}

export async function checkOrcidAction(prevState, formData) {
  const orcid = String(formData.get("orcid") || "").replace(/\s+/g, "");

  if (!ORCID_REGEX.test(orcid)) {
    return { error: "Invalid ORCID format" };
  }

  const user = await getUserByOrcid(orcid);

  const hasProfile =
    !!user &&
    (user.name ||
      user.email ||
      user.institution ||
      user.grant_search_preferences?.primary_research_field ||
      user.grant_search_preferences?.location);

  if (hasProfile) {
    const jar = await cookies();
    jar.set("orcid", orcid, { path: "/" });
    redirect("/");
  }

  return { needsInfo: true, orcid };
}

export async function applyFilters(formData) {
  const p = new URLSearchParams();

  const amountMin = formData.get("amountMin");
  const amountMax = formData.get("amountMax");
  if (amountMin) p.set("amountMin", amountMin);
  if (amountMax) p.set("amountMax", amountMax);

  for (const [k, v] of formData.entries()) {
    if (k === "category" || k === "funding") p.append(k, v);
  }

  const status = formData.get("status");
  if (status) p.set("status", status);

  const eligibilityMin = formData.get("eligibilityMin");
  const eligibilityMax = formData.get("eligibilityMax");
  if (eligibilityMin) p.set("eligibilityMin", eligibilityMin);
  if (eligibilityMax) p.set("eligibilityMax", eligibilityMax);

  const sort = formData.get("sort");
  if (sort) p.set("sort", sort);

  redirect(`/grants/search${p.toString() ? "?" + p.toString() : ""}`);
}

export async function updateProfileAction(formData) {
  const orcid = formData.get("orcid");
  if (!orcid) throw new Error("Missing ORCID");
  const tab = formData.get("tab") || "basic";

  console.log("made it into update profile");

  await upsertUser({
    orcid,
    name: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    location: formData.get("location") || undefined,
    university: formData.get("university") || undefined,
    primaryField: formData.get("primaryField") || undefined,
    secondaryField: formData.get("secondaryField") || undefined,
    degrees: formData.get("degrees") || undefined,
    goalsCsv: formData.get("goalsCsv") || undefined,
  });

  revalidatePath("/profile");
  redirect(`/profile?tab=${tab}`);
}
