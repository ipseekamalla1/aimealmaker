import Navbar from "./ui/Navbar";
import { getUser } from "@/lib/getUser";

export default async function NavbarWrapper() {
  const user = await getUser();
  return <Navbar user={user} />;
}
