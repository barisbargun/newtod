import z from 'zod'
import { validationMsg } from '../utils'

export const tabCreateSchema = z.object({
  name: z.string()
    .min(5, validationMsg('min', 5))
    .max(150, validationMsg('max', 150)),
})

export const tabUpdateSchema = tabCreateSchema

/*

TYPES

*/
export interface Tab {
  user_id: string
  id: string
  name: string
  order: number
  created_at: Date
}

export type TabCreate = z.infer<typeof tabCreateSchema>
export type TabUpdate = z.infer<typeof tabUpdateSchema>
