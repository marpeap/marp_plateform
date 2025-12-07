"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Merci de détailler votre besoin"),
});

export type ContactFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot
  if (formData.get("nickname")) {
    return { ok: true, message: "Merci !" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.errors.forEach((err) => {
      const path = err.path.join(".") || "form";
      errors[path] = err.message;
    });
    return { ok: false, errors, message: "Merci de corriger les champs." };
  }

  await prisma.contact.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    },
  });

  return { ok: true, message: "Message envoyé. Je reviens vers vous rapidement." };
}

