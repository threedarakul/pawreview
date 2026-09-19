import { auth } from "@/lib/auth/server";

const { GET, POST: baseAuthPost } = auth.handler();

export { GET };

export async function POST(
  request: Request,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  const restrictedRoute = path.join("/");

  if (restrictedRoute === "sign-up/email" || restrictedRoute === "sign-in/email") {
    const body = await request.clone().json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email : "";

    if (email.trim().toLowerCase() !== process.env.OWNER_EMAIL?.toLowerCase()) {
      return Response.json(
        { message: "บัญชีนี้ไม่ได้รับอนุญาตให้เข้าใช้งานระบบนี้" },
        { status: 403 }
      );
    }
  }

  return baseAuthPost(request, ctx);
}
