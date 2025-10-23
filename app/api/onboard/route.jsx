import { completeOnboarding } from "@/app/actions/userActions";

export async function POST(req) {
  const body = await req.json();
  const saved = await completeOnboarding(body);
  console.log("post successful");
  return Response.json(saved);
}
