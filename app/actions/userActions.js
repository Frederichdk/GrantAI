"use server";

import { upsertUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function completeOnboardingAction(formData) {
  const data = Object.fromEntries(formData);
  const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/;

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
