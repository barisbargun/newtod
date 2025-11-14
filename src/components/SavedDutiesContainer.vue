<script setup lang="ts">
import { Dumbbell, Pencil, Plus } from 'lucide-vue-next'
</script>

<template>
  <Card>
    <CardHeader class="flex-center! justify-between!">
      <CardTitle>
        Saved Duties
      </CardTitle>
      <Button size="icon" variant="ghost">
        <Pencil class="size-5 text-primary" />
      </Button>
    </CardHeader>
    <CardContent class="flex justify-between relative">
      <Tabs default-value="work" class="w-full">
        <TabsList>
          <TabsTrigger value="work">
            Work
          </TabsTrigger>
          <TabsTrigger value="fun">
            Fun
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <EventCard
            v-for="value in Array.from({ length: 3 })"
            :key="value"
            name="Workout"
            :icon="Dumbbell" :times="3"
            class="not-last:mb-4 w-full"
          />
        </TabsContent>
        <TabsContent value="fun">
          Change your password here.
        </TabsContent>
      </Tabs>
      <Button class="absolute top-0 right-6" size="icon" variant="ghost">
        <Plus class="size-5 text-primary" />
      </Button>
    </CardContent>
    <CardFooter>
      <Button class="mx-auto">
        <Plus />
        Add a New Duty
      </Button>
    </CardFooter>
  </Card>
</template>
