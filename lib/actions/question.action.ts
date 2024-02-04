"use server";

import { connectToDatabase } from "../db.connection";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();
  } catch (error) {
    console.log("an error occurred", error);
  }
}
