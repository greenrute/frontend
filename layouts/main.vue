<template>
  <Html class="h-full scroll-smooth antialiased [font-feature-settings:'ss01']">
    <Body class="flex h-full flex-col bg-white dark:bg-zinc-900" />
  </Html>

  <slot />

  <Notification />
  <Prompt />
</template>
