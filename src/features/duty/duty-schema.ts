import type { DutyIconKey } from '~/config/duty'
import z from 'zod'
import { useValidationMessages } from '~/lib/utils'

export function useDutyCreateSchema() {
  const validationMsg = useValidationMessages()
  return z.object({
    name: z.string()
      .min(3, validationMsg('min', 3))
      .max(150, validationMsg('max', 150)),
    color: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, 'Must be a valid 3-digit or 6-digit hex color'),
    icon: z.string()
      .min(3, validationMsg('min', 3))
      .max(150, validationMsg('max', 150)),
  })
}

export const useDutyUpdateSchema = useDutyCreateSchema

/*

TYPES

*/
export interface Duty {
  id: string
  tab_id: string
  name: string
  color: string
  icon: DutyIconKey
  total_times: number
  tw_times: number
  assigned_hours: number[]
  created_at: Date
}

export type DutyCreate = z.infer<ReturnType<typeof useDutyCreateSchema>>
export type DutyUpdate = z.infer<ReturnType<typeof useDutyUpdateSchema>>
