import { test, expect } from '@playwright/test';
exports.SignupPage = class SignupPage {

    constructor(page) {
        this.page = page
        this.first_name_textbox = page.getByPlaceholder('First Name')
        this.last_name_textbox = page.getByPlaceholder('Last Name')
        this.email_textbox = page.getByPlaceholder('Email')
        this.password_textbox = page.getByPlaceholder('Password')
        this.user_terms_checkbox = page.locator('id=user[terms]')
        this.signup_button = page.locator("//button[@type='submit']")
    }

    async goToSignupPage() {
        await this.page.goto("sign_up")
    }
    async signup(firstname, lastname, email, password) {
        await this.first_name_textbox.fill(firstname)
        await this.last_name_textbox.fill(lastname)
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.user_terms_checkbox.click()
        await this.signup_button.click()
        await this.page.pause()
        await expect(this.page.locator('//li/a[contains(text(),"My Dashboard")]')).toBeVisible()
    }
}