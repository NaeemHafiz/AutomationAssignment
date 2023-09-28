import { test, expect } from '@playwright/test';
exports.AuthenticationUserPage = class AuthenticationUserPage {

    constructor(page) {
        this.page = page
        this.first_name_textbox = page.getByPlaceholder('First Name')
        this.last_name_textbox = page.getByPlaceholder('Last Name')
        this.email_textbox = page.getByPlaceholder('Email')
        this.password_textbox = page.getByPlaceholder('Password')
        this.user_terms_checkbox = page.locator('id=user[terms]')
        this.signup_button = page.locator("//button[@type='submit']")
        this.signinSuccessToastMessage = this.page.locator("//p[text()='Signed in successfully.']")
        this.dashboardText = this.page.locator('(//li/a[contains(text(),"My Dashboard")])[1]')
        this.downArrayIcon = this.page.locator("//button//i[@class='fa fa-caret-down']")
        this.signoutText = this.page.locator("//li/a[contains(text(),'Sign Out')]")
        this.gmailField = this.page.locator("//input[@type='email']")
        this.nextBtn = page.locator("//span[text()='Next']")
    }

    async goToSignupPage() {
        await this.page.goto("sign_up")

    }
    async signup(firstname, lastname, email, password, gmail_url, signin_url) {
        await this.first_name_textbox.fill(firstname)
        await this.last_name_textbox.fill(lastname)
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.user_terms_checkbox.click()
        await this.signup_button.click()
        await expect(this.dashboardText).toBeVisible()
        await this.page.pause()
        await this.downArrayIcon.click()
        await this.signoutText.click()
        // Go To Email Server i.e, Gmail
        await this.page.goto(gmail_url)
        await this.gmailField.type(email)
        await this.nextBtn.click()
        // Go To Signin Page
        await this.page.goto(signin_url)
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.signup_button.click()
        await expect(this.signinSuccessToastMessage).toBeVisible()
    }
}