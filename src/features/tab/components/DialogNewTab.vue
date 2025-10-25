<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="icon" variant="ghost" v-bind="attrs">
        <Plus class="size-5 text-primary" />
      </Button>
    </DialogTrigger>
    <DialogContent class="text-foreground">
      <DialogHeader>
        <DialogTitle>Add a new duty</DialogTitle>
        <DialogDescription>
          Add a new duty to your schedule.
        </DialogDescription>
      </DialogHeader>
      <FormTabCreate />
    </DialogContent>
  </Dialog>
</template>
