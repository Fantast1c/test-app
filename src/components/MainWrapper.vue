<template>
  <main class="main-wrapper">
    <slot />
  </main>
</template>

<style scoped lang="scss">
.main-wrapper {
  grid-column: 2;
  overflow-y: auto;
}

@media (width <= $breakpoint-mobile) {
  .main-wrapper {
    grid-column: 1;
    grid-row: 2;
  }
}
</style>
