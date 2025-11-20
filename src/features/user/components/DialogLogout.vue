<script setup lang="ts">
import type { PostgrestError } from '@supabase/supabase-js'
import { toast } from 'vue-sonner'
import { useUserStore } from '../user-store'

const router = useRouter()
const { logout } = useUserStore()
const isDialogOpen = ref(false)
const isPending = ref(false)
const { t } = useI18n()

async function handleLogout() {
  isPending.value = true
  try {
    await logout()
    isDialogOpen.value = false

    router.push('/auth/login')
  }
  catch (error) {
    toast.error(t('toast.an_error_happened', { msg: (error as PostgrestError).message }))
  }

  isPending.value = false
}
</script>

<template>
  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogTrigger as-child>
      <Button variant="ghost" class="w-full block pl-2 text-left">
        {{ t('button.logout') }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('dialog.title_sure') }}</DialogTitle>
        <DialogDescription>
          {{ t('dialog.desc_logout') }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline" :disabled="isPending">
            {{ t('button.cancel') }}
          </Button>
        </DialogClose>
        <Button :onclick="handleLogout" variant="destructive" :disabled="isPending">
          <Spinner v-if="isPending" />
          {{ t('button.logout') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
