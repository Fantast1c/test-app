<script setup lang="ts">
import { useToastError } from '~/composables/toastError'

const { state, hideError } = useToastError()
</script>

<template>
  <Transition name="toast">
    <div v-if="state.visible" class="toast-error" @click="hideError">
      <div class="toast-error__content">
        <div class="toast-error__icon">
          <img
            src="/error-icon.svg"
            alt="Error"
            class="toast-error__icon-image"
          >
        </div>
        <div class="toast-error__message">
          {{ state.message }}
        </div>
        <BaseButton
          theme="primary"
          class="toast-error__close"
          @click.stop="hideError"
        >
          <img
            src="/close-icon.svg"
            alt="Close"
            class="toast-error__close-icon"
          >
        </BaseButton>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast-error {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  max-width: 50rem;
  width: calc(100% - 4rem);
  cursor: pointer;

  &__content {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem 2rem;
    background: $color-error-light;
    border: 0.2rem solid $color-error;
    border-radius: 0.8rem;
    box-shadow: 0 0.8rem 2rem rgba(236, 72, 153, 0.2);
    color: $color-black;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0.4rem;
      background: $gradient-error;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
  }

  &__icon-image {
    width: 100%;
    height: 100%;
  }

  &__message {
    flex: 1;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.5;
    color: $color-error-darker;
  }

  &__close {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &__close-icon {
    width: 100%;
    height: 100%;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-2rem);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-2rem);
}

@media (width <= $breakpoint-mobile) {
  .toast-error {
    top: 1rem;
    width: calc(100% - 2rem);

    &__content {
      padding: 1.2rem 1.6rem;
    }

    &__message {
      font-size: 1.3rem;
    }
  }
}
</style>
