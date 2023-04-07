import { until, By } from 'selenium-webdriver'
import { autocompleteSelect, buttonClick, inputWords } from '../helper.js'
import { HOST } from '../constant.js'
import driver from '../driver.js'

async function list () {
  await driver.sleep(500)

  await autocompleteSelect('lean in spring', 'Lean in Spring (53)', { name: 'program-autocomplete' })
  // const input = By.css('input[name="program-autocomplete"]')
  // await driver.wait(until.elementLocated(input), 100000)
  // await driver.findElement(input).sendKeys()
  // await driver.wait(until.elementLocated(By.xpath('//td[text()="14140"]')), 100000)
}

async function add () {
  await buttonClick({ id: 'add-btn' })
  await autocompleteSelect('lean in spring', 'Lean in Spring (53)', { name: 'program_id' })
  await autocompleteSelect('2', '2', { name: 'week' })
  await autocompleteSelect('video', 'Video', { name: 'content_type' })
  await inputWords('8', { name: 'content_id' })
  await autocompleteSelect('3', '3', { name: 'sequence' })

  await buttonClick({ id: 'save-btn' })
}

async function edit () {
  await buttonClick({ className: 'edit-btn-img' })

  await autocompleteSelect('Cardio Kick', 'Cardio Kick (66)', { name: 'program_id' })
  await autocompleteSelect('3', '3', { name: 'week' })
  await autocompleteSelect('tip', 'Tip', { name: 'content_type' })
  await inputWords('18', { name: 'content_id' })
  await autocompleteSelect('4', '4', { name: 'sequence' })

  await buttonClick({ id: 'save-btn' })
}

export default async function ProgramNutrition () {
  await driver.get(`${HOST}/program-nutrition`)
  await driver.sleep(500)
  await add()
  await driver.sleep(200)
  await list()
  await driver.sleep(500)
  await edit()
  driver.sleep(50000)
}
