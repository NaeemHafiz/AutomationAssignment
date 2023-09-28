import { test, expect } from '@playwright/test';
import { AuthenticationUserPage } from '../pages/authentication_user'
const testData = require('../test-data/TestData.json');


test.only('Verify that user is successfully registered and Signin', async ({ page }) => {
  const AuthenticationUser = new AuthenticationUserPage(page)
  await AuthenticationUser.goToSignupPage()
  await AuthenticationUser.signup(testData.user.firstname, testData.user.lastname, testData.user.email, testData.user.password, testData.user.gmail_url, testData.user.signin_url)
});

test("Verify that Michael Silva's Salary is equal to  198500", async ({ request }) => {
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
    response.json().then((value) => {
      var employees = value.data
      employees.forEach(element => {
        if (element.employee_name === 'Michael Silva') {
          expect(element.employee_salary).toBe(198500)
        }
      });
    })
  }
});