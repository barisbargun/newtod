import {
  BookOpen,
  Briefcase,
  Calendar,
  Dumbbell,
  Footprints,
  GraduationCap,
  Heart,
  Home,
  Monitor,
  Moon,
  PiggyBank,
  Pizza,
  Plane,
  Receipt,
  Settings,
  ShoppingCart,
  Sparkles,
  Sun,
  Users,
  Utensils,
} from 'lucide-vue-next'

export const dutyIcons = {
  // Reading/Learning
  bookOpen: BookOpen,
  graduationCap: GraduationCap,

  // Fitness/Health
  dumbbell: Dumbbell,
  heart: Heart,
  footprints: Footprints,

  // Work/Business
  briefcase: Briefcase,
  monitor: Monitor,
  settings: Settings,

  // Finance/Errands
  piggyBank: PiggyBank,
  shoppingCart: ShoppingCart,
  receipt: Receipt,

  // Home/Chores
  home: Home,
  utensils: Utensils,
  pizza: Pizza,

  // Social/Other
  users: Users,
  calendar: Calendar,
  sparkles: Sparkles,
  plane: Plane,

  // Time/Weather (e.g., morning routine, night task)
  sun: Sun,
  moon: Moon,
} as const

export type DutyIconKey = keyof typeof dutyIcons

export const dutyColors = [
  '#F87171',
  '#FBBF24',
  '#34D399',
  '#60A5FA',
  '#A78BFA',
  '#F472B6',
]
