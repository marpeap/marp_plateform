import { AuthForm } from "@/components/forms/AuthForm";
import { resetPassword } from "@/lib/supabase/auth";

export const metadata = {
  title: "Réinitialiser le mot de passe | Marpeap Digitals",
  description: "Réinitialisez votre mot de passe Marpeap Digitals",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <AuthForm type="reset" action={resetPassword} />
    </div>
  );
}

