import { GetCookies } from "../../CustomFunctions/HandleCookies";

import { UserDashboard } from "./UserDashboard";
import { GuestDashboard } from "./GuestDashboard";

export const Dashboard = () => {
  const userData = GetCookies("authUser") || null;

  return (
    <div>{userData !== null ? <UserDashboard /> : <GuestDashboard />}</div>
  );
};
