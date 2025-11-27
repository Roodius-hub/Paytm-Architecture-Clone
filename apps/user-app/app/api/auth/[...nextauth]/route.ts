import NexrAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

const handler = NexrAuth(authOptions);

export {
  handler as GET , 
  handler as POST
}