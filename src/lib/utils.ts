import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useValidationMessages() {
  const { t } = useI18n()

  return (type: 'min' | 'max', characters: number, isNumber: boolean = false): string => {
    let key: string

    if (isNumber) {
      key = type === 'min' ? 'validation.min_number' : 'validation.max_number'
    }
    else {
      key = type === 'min' ? 'validation.min_chars' : 'validation.max_chars'
    }

    return t(key, { characters })
  }
}
