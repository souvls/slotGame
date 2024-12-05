
import { redirect } from "next/navigation";
import Login from "../component/Login"
import { getCookie } from "@/lib/Cookie";
export default async function App() {
  const user = await getCookie("userdata")
  if (user) {
    redirect("/");
  }
  return (
    <Login />
  );
}
