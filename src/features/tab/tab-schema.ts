import z from 'zod'
import { useValidationMessages } from '~/lib/utils'

export function useTabCreateSchema() {
  const validationMsg = useValidationMessages()
  return z.object({
    name: z.string()
      .min(3, { message: validationMsg('min', 3) })
      .max(150, { message: validationMsg('max', 150) }),
  })
}

export const useTabUpdateSchema = useTabCreateSchema

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

export type TabCreate = z.infer<ReturnType<typeof useTabCreateSchema>>
export type TabUpdate = z.infer<ReturnType<typeof useTabUpdateSchema>>
