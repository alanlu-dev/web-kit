import type { NotionDatabaseRowType } from '../src/NotionDatabaseSchema'
import { NotionDatabaseRowSchema } from '../src/NotionDatabaseSchema'
import { notion } from './notionClient'

export async function getNotionDatabaseRows(databaseId: string): Promise<NotionDatabaseRowType[]> {
  const database = await notion.databases.query({ database_id: databaseId })
  return NotionDatabaseRowSchema.array().parse(database.results)
}
