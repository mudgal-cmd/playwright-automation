import { request, expect } from "@playwright/test";

export async function createContactMessage() {
  const createNewContext = await request.newContext();
  const apiUrl = process.env.API_URL;

  let response = await createNewContext.post(`${apiUrl}/messages`, {
    data: {
      message:
        "this is a message with over 50 characters and will be automatically created using API",
      name: "Jane Doe",
      subject: "payments",
    },
    headers: {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
    },
  });

  // console.log(response.json());
  
  expect(response.status()).toBe(200);
  // response = await response.json();
  
  return response;
}
