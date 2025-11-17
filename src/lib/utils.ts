import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validationMsg(type: 'min' | 'max', characters: number, isNumber: boolean = false) {
  return `Must be at ${type === 'min' ? 'least' : 'most'} ${characters}${isNumber ? '' : ' characters'}.`
}
