<script setup lang="ts">
// const {} = defineProps<{}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child class="">
      <Button type="menu" class="mx-auto">
        Add a new duty
      </Button>
    </DialogTrigger>
    <DialogContent class="text-foreground">
      <DialogHeader>
        <DialogTitle>Add a new duty</DialogTitle>
        <DialogDescription>
          Add a new duty to your schedule.
        </DialogDescription>
      </DialogHeader>
      <div class="grid w-full max-w-sm items-center gap-1.5 my-4">
        <Label for="duty">Duty name</Label>
        <Input id="duty" type="text" placeholder="Enter your duty's name" />
      </div>
      <DialogFooter>
        <Button type="submit" class="mx-auto">
          Add a new duty
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
