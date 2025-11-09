<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String as PropType<'primary' | 'danger'>,
    required: true,
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
})
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
    class="base-button" :class="[`base-button--${props.theme}`]"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    color: $color-white;
    background: $gradient-primary;

    &:hover:not(:disabled) {
      transform: translateY(-0.2rem);
      box-shadow: 0 1rem 2rem rgba(102, 126, 234, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--danger {
    color: $color-danger;
    background: transparent;
    border: 0.2rem solid $color-danger;

    &:hover:not(:disabled) {
      background: $color-danger;
      color: $color-white;
    }
  }
}
</style>
