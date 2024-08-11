import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

// 提取 and 的型別
type ExtractAnd<T> = T extends { and: infer U } ? U : never

export type AndFilterType = ExtractAnd<NonNullable<QueryDatabaseParameters['filter']>>
