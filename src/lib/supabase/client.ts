import { createBrowserClient } from "@supabase/ssr";

let _supabase: ReturnType<typeof createBrowserClient> | null = null;

function getClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase URL and anon key are required. Check your .env.local or Vercel environment variables.",
      );
    }
    _supabase = createBrowserClient(url, key);
  }
  return _supabase;
}

// Proxy so `supabase.auth`, `supabase.from()` etc. all work
export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_target, prop) {
    const client = getClient();
    const value = (client as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

export const signInWithGoogle = async () => {
  console.log("Initiating Supabase OAuth...");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=/account`,
    },
  });
  if (error) {
    console.error("Google Auth Error:", error.message);
    alert("Google Sign-In Error: " + error.message);
  }
  return data;
};

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=/account`,
    },
  });
  if (error) {
    console.error("Apple Auth Error:", error.message);
    alert("Apple Sign-In Error: " + error.message);
  }
  return data;
};
