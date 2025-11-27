import "../../global.css";
import { Button } from "../button";

interface AppbarProps {
    user?: { name?: string | null;},
    onSignin:any,
    onSignout:any
}

export const Appbar = ({user, onSignin, onSignout}: AppbarProps) => {
  return <div className="p-4">
  <div className="border border-black-600 rounded-lg p-2 flex justify-between font-normal md:font-bold items-center ">
    
    <div className="font-weight: 700 text-2xl p-4">
      Paytm
    </div>
    <Button onClick={user ? onSignin : onSignout}>
      {user ? "SignOut" : "SignIn"}
    </Button>
  </div>
  </div> 
}