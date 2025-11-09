<script setup lang="ts">
interface Props {
  title?: string
  balance?: string
}

const props = defineProps<Props>()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div
        v-if="props.title"
        class="sidebar__username"
      >
        {{ props.title }}
      </div>
    </div>

    <div class="sidebar__content">
      <div
        v-if="props.balance"
        class="balance-card"
      >
        <div class="balance-card__label">
          Баланс
        </div>
        <div class="balance-card__value">
          {{ props.balance }}
        </div>
      </div>

      <div class="sidebar__logout">
        <slot />
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  background: $color-white;
  border-right: 0.1rem solid $color-gray-lightest;
  display: flex;
  flex-direction: column;

  &__header {
    padding: 2.4rem;
    border-bottom: 0.1rem solid $color-gray-lightest;
  }

  &__username {
    font-size: 1.8rem;
    font-weight: 600;
    color: $color-black;
  }

  &__content {
    padding: 2.4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__logout {
    margin-top: auto;
  }
}

.balance-card {
  padding: 2rem;
  background: $gradient-primary;
  border-radius: 1.2rem;
  color: $color-white;

  &__label {
    font-size: 1.4rem;
    opacity: 0.9;
    margin-bottom: 0.8rem;
  }

  &__value {
    font-size: 3rem;
    font-weight: 700;
  }
}
</style>
