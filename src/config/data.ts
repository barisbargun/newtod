import type { DutyIconKey } from './duty-icons'

export interface Duty {
  name: string
  times: number
  color: string
  icon: DutyIconKey
}

export const duties: Duty[] = [
  { name: 'Workout', times: 4, color: '#9784eb', icon: 'footprints' },
  { name: 'Read a book', times: 5, color: '#6bb56b', icon: 'bookOpen' },
]
