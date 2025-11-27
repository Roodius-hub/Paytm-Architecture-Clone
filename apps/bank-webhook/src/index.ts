import express from "express";

const app = express();

app.use(express.json());

interface HDFCweb {
  token : string,
  user_identifier : string,
  amount : number
}

app.post("/hdfcWebhook", (req:express.Request<{}, {}, HDFCweb>,res:express.Response) => {
  const   paymentInformation = {
    token : req.body.token,
    userId : req.body.user_identifier,
    amount : req.body.amount
  };
  // Update balance in db, add txn
 
})

app.listen(3000, () => { console.log("server started on port " + 3000)});