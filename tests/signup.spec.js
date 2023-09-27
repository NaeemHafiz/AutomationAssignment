import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup'
const testData = JSON.parse(JSON.stringify(require('../test-data/TestData.json')));


test.only('User Test', async ({ page }) => {
  const Signup = new SignupPage(page)
  await Signup.goToSignupPage()
  await Signup.signup(testData.user.firstname, testData.user.lastname, testData.user.email, testData.user.password)
});

test("API Test", async ({ request }) => {
  const response = await request.get(testData.api.apibaseurl + '/employees')
  if (response.status() == 429) {
    console.log("Too Many Requests")
    test.fail()
  } else if (response.status() == 500) {
    console.log("Internal Server Error")
    test.fail()
  } else if (response.status() == 404) {
    console.log("Not Found")
    test.fail()
  }
  else {
    expect(response.status()).toBe(200)
    const responseData = await response.json()
    expect(responseData.data[15].employee_salary).toBe(198500)
    console.log(responseData.data)
  }
});