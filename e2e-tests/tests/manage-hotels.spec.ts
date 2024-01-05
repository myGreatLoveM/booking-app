import test, { expect } from '@playwright/test'
import path from 'path'

const UI_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL)

  await page.getByRole('link', { name: 'Sign In' }).click()
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()

  await page.locator('[name=email]').fill('test@test.com')
  await page.locator('[name=password]').fill('test@123')
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Signin successful')).toBeVisible()
})

test('shoul allow user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`)

  await expect(page.getByRole('heading', { name: 'Add Hotel' })).toBeVisible()

  await page.locator('[name=name]').fill('test hotel')
  await page.locator('[name=city]').fill('test city')
  await page.locator('[name=country]').fill('test country')
  await page.locator('[name=description]').fill('This is a description')
  await page.locator('[name=pricePerNight]').fill('1000')
  await page.selectOption('select[name=starRating]', '3')
  await page.getByText('Budget').click()
  await page.getByLabel('Free WiFi').check()
  await page.getByLabel('Parking').check()
  await page.locator('[name=adultCount]').fill('2')
  await page.locator('[name=childCount]').fill('2')

  await page.setInputFiles('[name=imageFiles]', [
    path.join(__dirname, 'files', '1.png'),
    path.join(__dirname, 'files', '2.png'),
  ])

  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Hotel Saved!')).toBeVisible()
})

test('should display all hotels', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`)

  await expect(page.getByRole('heading', { name: 'My Hotels' })).toBeVisible()

  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'test hotel' }).first()
  ).toBeVisible()
  await expect(
    page.locator(':has-text("Lorem ipsum dolor sit amet")').first()
  ).toBeVisible()

  await expect(page.getByText('test city, test country').first()).toBeVisible()
  await expect(page.getByText('Romantic').first()).toBeVisible()
  await expect(page.getByText('₹ 10000 per night').first()).toBeVisible()
  await expect(page.getByText('2 adults, 1 children').first()).toBeVisible()
  await expect(page.getByText('4 Star Rating').first()).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'View Details' }).first()
  ).toBeVisible()
})

test('should able to update existing hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`)

  await expect(page.getByRole('heading', { name: 'My Hotels' })).toBeVisible()
})
