import assert from 'node:assert/strict'

import * as dotenv from 'dotenv'

import { getNotionDatabaseRows } from './getNotionDatabaseRows'

dotenv.config()

describe('getNotionDatabaseRows', () => {
  it('should not reject', async () => {
    await assert.doesNotReject(getNotionDatabaseRows(process.env.NOTION_DATABASE_ID || ''))
  })
  it('should return a list of rows', async () => {
    const rows = await getNotionDatabaseRows(process.env.NOTION_DATABASE_ID || '')
    assert.strictEqual(rows.length, 4)
  })
})
