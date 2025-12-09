import { AuthForm } from "@/components/forms/AuthForm";
import { signIn } from "@/lib/supabase/auth";

export const metadata = {
  title: "Connexion | Marpeap Digitals",
  description: "Connectez-vous à votre compte Marpeap Digitals",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <AuthForm type="login" action={signIn} />
    </div>
  );
}

