import { IUser } from "@/interfaces/user.interface";
import { getMyProfile } from "@/services/user.service";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const user = (await getMyProfile()) as IUser;
  return <NavbarClient user={user} />;
};

export default Navbar;
