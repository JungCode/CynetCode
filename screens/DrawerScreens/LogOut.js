import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

function Logout(params) {
  const autCtx = useContext(AuthContext);
  autCtx.logout();
  return <></>;
}
export default Logout;