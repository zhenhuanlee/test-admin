import { By, until } from 'selenium-webdriver'
import driver from '../driver.js'
import { HOST, TIMEOUT } from '../constant.js'

export default async function login () {
  await driver.get(HOST)

  await driver.wait(until.elementLocated(By.name('username')), 10000)
  await driver.findElement(By.name('username')).sendKeys('arnold@i.co')

  await driver.wait(until.elementLocated(By.name('password')), 10000)
  await driver.findElement(By.name('password')).sendKeys('123123')

  await driver.findElement(By.css('button')).click()

  await driver.wait(until.elementLocated(By.className('MuiSvgIcon-root')), TIMEOUT)
}
