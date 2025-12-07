import { redirect } from "next/navigation";

export default function ClientIndex() {
  redirect("/client/dashboard");
}

