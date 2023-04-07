import pkg from 'selenium-webdriver'
import safari from 'selenium-webdriver/safari.js'

const { until, Builder, By, Capabilities, WebDriver, Actions } = pkg

const driver = await new Builder()
  .forBrowser('safari')
  .setSafariOptions(new safari.Options())
  .build()

await driver.manage().window().setRect({ width: 1500, height: 600 })

export default driver
