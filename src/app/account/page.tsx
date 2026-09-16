import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import AccountDashboard from "@/components/luxe/AccountDashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your LUXE account, view orders, wishlist, and profile settings.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  let profile = null;
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  } catch {
    profile = null;
  }

  return <AccountDashboard user={user} profile={profile} />;
}
