import assert from 'node:assert/strict'

import * as dotenv from 'dotenv'

import { getNotionPage } from './getNotionPage'

dotenv.config()

describe('getNotionPage', () => {
  it('should not reject', async () => {
    await assert.doesNotReject(getNotionPage(process.env.NOTION_PAGE_ID || ''))
  })
  it('should return a page with contents', async () => {
    const page = await getNotionPage(process.env.NOTION_PAGE_ID || '')
    assert.strictEqual(page.id.replaceAll('-', ''), process.env.NOTION_PAGE_ID)
    assert.strictEqual(page.object, 'page')
  })
  it('should work with a complex dashboard', async () => {
    const page = await getNotionPage(process.env.NOTION_DASHBOARD_ID || '')

    assert.strictEqual(page.id.replaceAll('-', ''), process.env.NOTION_DASHBOARD_ID)
    assert.strictEqual(page.object, 'page')
  })
})
