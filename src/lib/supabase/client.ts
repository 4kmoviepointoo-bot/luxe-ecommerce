import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

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
