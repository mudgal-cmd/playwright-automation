import { request,expect } from "@playwright/test";

export async function registerUser(email:string, password:string) {
  const createRequestContext = await request.newContext();
  const apiUrl = process.env.API_URL;
  
  if(!apiUrl) throw new Error("API Url is not defined");

  console.log(apiUrl);

  const response = await createRequestContext.post(`${apiUrl}/users/register`, {
    data: {
      first_name: "test",
      last_name: "testlname",
      dob: "2000-12-12",
      phone: "9087654321",
      email: email,
      password: password,
      address: {
        street: "1 street",
        city: "city",
        state: "state",
        country: "US",
        postal_code: "34211",
      },
    },
    headers: {
      "sec-ch-ua-platform": '"Windows"',
      Referer: "https://practicesoftwaretesting.com/",
      "Accept-Language": "en-US",
      "sec-ch-ua": '"Not:A-Brand";v="24", "Chromium";v="134"',
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.35 Safari/537.36",
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  console.log("api request completed");
  expect(response.status()).toBe(201);
  
  return response.status();

}


