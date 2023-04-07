import { By, Key, until } from 'selenium-webdriver'
import { TIMEOUT } from './constant.js'
import driver from './driver.js'

function findElem (selector) {
  const { id, name, xpath, css, className } = selector

  return (id && By.id(id))
      || (css && By.css(css))
      || (name && By.name(name))
      || (xpath && By.xpath(xpath))
      || (className && By.className(className))
}

async function clearInput (elem) {
  const val = await elem.getAttribute('value')
  await Promise.all(Array.from(`${val}`).map(() => elem.sendKeys(Key.BACK_SPACE)))
}

export async function waitCoverInvisible () {
  return driver.wait(until.elementIsNotVisible(driver.findElement(By.className('MuiBackdrop-root'))), TIMEOUT)
}

export async function buttonClick (selector) {
  const elem = findElem(selector)
  await driver.wait(until.elementLocated(elem), TIMEOUT)
  await driver.findElement(elem).click()
}

export async function inputWords (value, selector, clear = true) {
  const elem = findElem(selector)
  await driver.wait(until.elementLocated(elem), TIMEOUT)
  const inputElem = driver.findElement(elem)
  if (clear) await clearInput(inputElem)
  return inputElem.sendKeys(value)
}

export async function autocompleteSelect (value, optionValue, selector) {
  const elem = findElem(selector)
  await driver.wait(until.elementLocated(elem), TIMEOUT)
  const inputElem = driver.findElement(elem)
  await driver.sleep(100)
  await clearInput(inputElem)

  await inputElem.sendKeys(value)

  await driver.sleep(100)

  const label = By.xpath(`//li[contains(text(),"${optionValue}")]`)
  await driver.wait(until.elementLocated(label), 10000)
  return driver.findElement(label).click()
}

export async function checkSuccessLabel (msg = 'success') {
  const successLabel = await driver.wait(until.elementLocated(By.xpath(`//div[contains(@class,'MuiAlert-message')][contains(text(),'${msg}')]`)))
  await successLabel.findElement(By.xpath('following-sibling::*[1]')).click()
}
