import express from "express";
import ngrok from "@ngrok/ngrok";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// ! IMPORTANT: Make sure to set the environment variables in the .env file before running the server
const chargilyApiSecretKey = process.env.CHARGILY_SECRET_KEY;
const ngrokAuthToken = process.env.NGROK_AUTH_TOKEN;
const ngrokStaticDomain = process.env.NGROK_STATIC_DOMAIN;
const port = 3000;

const app = express();

app.use(express.json());

// ? This is to prevent the browser from showing a warning when the ngrok URL is opened
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "1");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello this is a webhook server!" });
});

app.post("/webhook", (req, res) => {
  // Extracting the 'signature' header from the HTTP request
  const signature = req.get("signature");

  // Getting the raw payload from the request body
  const payload = JSON.stringify(req.body);

  console.log(payload);

  // If there is no signature, ignore the request
  if (!signature) {
    return res.sendStatus(400);
  }

  // Calculate the signature
  const computedSignature = crypto
    .createHmac("sha256", chargilyApiSecretKey)
    .update(payload)
    .digest("hex");

  // If the calculated signature doesn't match the received signature, ignore the request
  if (computedSignature !== signature) {
    return res.sendStatus(403);
  }

  // If the signatures match, proceed to decode the JSON payload
  const event = req.body;

  console.log(`event is : ${event}`);

  // Switch based on the event type
  switch (event.type) {
    case "checkout.paid":
      const checkout = event.data;
      console.log(checkout);
      // Handle the successful payment.
      break;
    case "checkout.failed":
      const failedCheckout = event.data;
      console.log(failedCheckout);
    // Handle the failed payment.

    case "checkout.expired":
      const expiredCheckout = event.data;
      console.log(expiredCheckout);
      // Handle the expired payment.
      break;
    default:
      console.log("Unknown event type");
  }

  // Respond with a 200 OK status code to let us know that you've received the webhook
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`Express server live at http://localhost:${port}`)
);
ngrok
  .connect({
    addr: port,
    authtoken: ngrokAuthToken,
    domain: ngrokStaticDomain,
  })
  .then((listener) => console.log(`Ingress established at: ${listener.url()}`))
  .catch((err) => console.log("Error occurred: " + err));
