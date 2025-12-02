import express from "express";
import db   from "@repo/db/client";  //  error solved !

const app = express();
app.use(express.json());

interface HDFCweb {
  token : string,
  userId : number,
  amount : number
}

app.post("/hdfcWebhook",async (req:express.Request<{}, {}, HDFCweb>,res:express.Response) => {
  const   paymentInformation = {
    token : req.body.token,
    userId : req.body.userId,
    amount : req.body.amount
  };
  // Update balance in db, add txn
  try {
    // const balance = db.Balance.findFirst({
    //   where :{
    //     userId:paymentInformation.userId
    //   }
    // })
    await db.balance.update({
      where :{
        userId:paymentInformation.userId
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
      token:paymentInformation.token
    }, 
    data: {
      status : "success" // success key are in built in prisma
    }
  })
})

app.listen(3000, () => { console.log("server started on port " + 3000)});