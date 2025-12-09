import { AuthForm } from "@/components/forms/AuthForm";
import { signUp } from "@/lib/supabase/auth";

export const metadata = {
  title: "Inscription | Marpeap Digitals",
  description: "Créez votre compte Marpeap Digitals",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <AuthForm type="register" action={signUp} />
    </div>
  );
}

