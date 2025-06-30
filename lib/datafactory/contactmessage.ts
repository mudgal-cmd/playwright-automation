import { request, expect } from "@playwright/test";
import * as fs from "fs";

//Create Message DataFactory
export async function createContactMessage(authFilePath:string, subject:string, message:string) {
  const createNewContext = await request.newContext();
  const apiUrl = process.env.API_URL + "/messages";

  const messageAuthData = JSON.parse(fs.readFileSync(authFilePath, "utf-8"));

  const token = messageAuthData.origins[0].localStorage.find((item) => item.name === "auth-token").value;
  
  await createNewContext.post(apiUrl,{
    data:{
      subject: subject,
      message,
    },
    headers:{
      "Authorization":`Bearer ${token}`
    }
  });

}
