<script setup lang="ts">
import type { Game } from '~/types/api'

interface Props {
  game: Game
}

const props = defineProps<Props>()

const emit = defineEmits<{
  play: [gameId: string]
}>()

const cardRef = ref<HTMLElement | null>(null)
const imageError = ref(false)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  cardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  {
    rootMargin: '50px',
  },
)

function onPlayClick() {
  emit('play', props.game.id)
}

function onImageError() {
  imageError.value = true
}

function onCardKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onPlayClick()
  }
}
</script>

<template>
  <CardSkeleton
    v-if="!isVisible"
    ref="cardRef"
  />

  <div
    v-else
    tabindex="0"
    class="game-card"
    @keydown="onCardKeydown"
  >
    <img
      v-if="!imageError"
      :src="game.attributes.image"
      :alt="game.attributes.title"
      loading="lazy"
      class="game-card__image"
      @error="onImageError"
    >
    <div
      v-else
      class="game-card__placeholder"
    >
      <img
        src="/placeholder-image.svg"
        alt="Image placeholder"
        class="game-card__placeholder-icon"
      >
    </div>

    <div class="game-card__content">
      <h3 class="game-card__title">
        {{ game.attributes.title }}
      </h3>

      <BaseButton
        theme="primary"
        tabindex="-1"
        class="game-card__button"
        @click.stop="onPlayClick"
      >
        Play
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-card {
  width: 100%;
  padding-top: 66.67%;
  position: relative;
  overflow: hidden;
  background: $color-background;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-primary;
    opacity: 0.3;
  }

  &__placeholder-icon {
    width: 40%;
    height: 40%;
    filter: brightness(0) invert(1);
  }

  &__content {
    padding: 1.6rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 600;
    color: $color-black;
    margin: 0 0 1.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__button {
    margin-top: auto;
    width: 100%;
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: $color-white;
    background: $gradient-primary;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
