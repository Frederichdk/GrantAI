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
    Boolean(user.name?.trim()) &&
    Boolean(user.email?.trim()) &&
    Boolean(user.institution?.trim()) &&
    Boolean(user.grant_search_preferences?.primary_research_field?.trim()) &&
    Boolean(user.grant_search_preferences?.location?.trim());

  if (hasProfile) {
    const jar = await cookies();
    jar.set("orcid", orcid, { path: "/" });
    redirect("/");
  }

  return { needsInfo: true, orcid, user };
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
  const toNum = (v) => {
    const s = (v ?? "").toString().trim();
    return s === "" ? undefined : Number(s);
  };

  const payload = {
    orcid,
    name: formData.get("name"),
    email: formData.get("email"),
    location: formData.get("location"),
    university: formData.get("university"),
    primaryField: formData.get("primaryField"),
    secondaryField: formData.get("secondaryField"),
    years_since_degree: formData.get("years"),
    project_duration: formData.get("project_duration"),
    desired_funding_min: toNum(formData.get("desired_funding_min")),
    desired_funding_max: toNum(formData.get("desired_funding_max")),
    collaboration_interest: formData.get("collaboration_interest"),
  };
  if (formData.has("degrees")) payload.degrees = formData.get("degrees");
  if (formData.has("goalsCsv")) payload.goalsCsv = formData.get("goalsCsv");
  await upsertUser(payload);

  revalidatePath("/profile");
  redirect(`/profile?tab=${tab}`);
}
