import type { NextApiRequest, NextApiResponse } from "next";
// import * as admin from "firebase-admin";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const app = admin.initializeApp();
  // const db = app.firestore();

  res.status(200).json({ name: "John Doe" });
}
