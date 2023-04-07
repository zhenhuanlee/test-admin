import driver, { checkSuccessLabel, waitCoverUnvisible } from '../util.js'
import { By } from 'selenium-webdriver'
import foo from 'selenium-webdriver'
const { until } = foo

async function userSearch () {
  const input = By.css('input[placeholder="ID Name Or Email"]')
  await driver.wait(until.elementLocated(input), 100000)
  await driver.findElement(input).sendKeys(14140)
  await driver.wait(until.elementLocated(By.xpath('//td[text()="14140"]')), 100000)

  return driver
}

// async function userDetail () {
//   await driver.findElement(By.css('tbody')).click()
//   await driver.wait(until.elementLocated(By.xpath('//span[text()="jude@interactivelabs.co"]')), TIMEOUT)
// }

async function userEdit () {
  await driver.findElement(By.className('edit-btn-img')).click()
  const foo = await driver.findElement(By.css('input[placeholder="Enter a keyword"]'))
  await foo.sendKeys('test1001')

  // grant promo
  const too = By.xpath('//li[contains(text(),"test1001")]')
  await driver.wait(until.elementLocated(too), 10000)
  await driver.findElement(too).click()
  await driver.findElement(By.xpath('//span[text()="Grant"]')).click()
  await checkSuccessLabel()

  // set password
  await driver.findElement(By.css('input[placeholder="new password"]')).sendKeys('n7758258')
  await waitCoverUnvisible()
  await driver.findElement(By.xpath("//button[descendant::span[contains(text(),'Set Password')]]")).click()
  await checkSuccessLabel('Save success.')

  const activeLabel = driver.findElement(By.xpath("//span[text()='Active']"))
  const activeToggle = await activeLabel.findElement(By.xpath('following-sibling::*[1]'))
  const saveBtn = await driver.findElement(By.xpath("//button[descendant::span[contains(text(),'Save')]]"))

  // inactive
  await waitCoverUnvisible()
  await activeToggle.click()
  await saveBtn.click()
  await checkSuccessLabel('Save success.')
  // active
  await waitCoverUnvisible()
  await activeToggle.click()
  await saveBtn.click()
  await checkSuccessLabel('Save success.')
}

export default async function () {
  await userSearch()
  await userEdit()
}
