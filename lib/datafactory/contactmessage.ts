import { request, expect } from "@playwright/test";
//Create Message DataFactory
export async function createContactMessage() {
  const createNewContext = await request.newContext();
  const apiUrl = process.env.API_URL+"/";


  
  

}
