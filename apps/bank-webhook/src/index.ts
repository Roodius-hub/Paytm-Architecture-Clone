import express from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());

interface HDFCweb {
  token : string,
  user_identifier : string,
  amount : number
}

app.post("/hdfcWebhook",async (req:express.Request<{}, {}, HDFCweb>,res:express.Response) => {
  const   paymentInformation = {
    token : req.body.token,
    userId : req.body.user_identifier,
    amount : req.body.amount
  };
  // Update balance in db, add txn
  try {
    // const balance = db.Balance.findFirst({
    //   where :{
    //     userId:paymentInformation.userId
    //   }
    // })
    await db.Balance.update({
      where :{
        useId:paymentInformation.userId
      },
      data: {
          amount:{
            increment:paymentInformation.amount
          }
        }
  })
  } catch (e) {
      console.log(e);
  }
  db.onRampTransaction.update({
    where:{
      token
    }
  })
})

app.listen(3000, () => { console.log("server started on port " + 3000)});