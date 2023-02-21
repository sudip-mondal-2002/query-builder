export const possibleFields = [
    'Theme',
    'Sub-theme',
    'Reason',
    'Language',
    'Source',
    'Rating',
    'Time Period',
    'Customer ID'
] as const

export const possibleConditions = [
    'Equals',
    'Does not equal',
    'Like',
    'Not like',
    'Is Empty',
    'Is',
    'Is not'
] as const

export type FieldType = typeof possibleFields[number]

export type ConditionType = typeof possibleConditions[number]

export interface Rule {
    id: number[],
    field?: FieldType,
    condition?: ConditionType,
    value?: string[]
    type: "rule"
}