<template>
  <Html class="h-full scroll-smooth antialiased">
    <Body class="flex h-full flex-col bg-white dark:bg-zinc-900" />
  </Html>

  <slot />

  <Notification />
  <Prompt />
</template>
