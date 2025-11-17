import type { DutyIconKey } from '~/config/duty-icons'

export interface Duty {
  id: string
  tab_id: string
  name: string
  color: string
  icon: DutyIconKey
  total_times: number
  tw_times: number
  assigned_hours: number[]
  last_upd_date: Date
  created_at: Date
}

export type DutyAdd = Pick<Duty, 'tab_id' | 'name' | 'color' | 'icon'>

export type DutyUpdate = Pick<Duty, 'name' | 'color' | 'icon'>
