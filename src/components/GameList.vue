<script setup lang="ts">
import type { Game } from '~/types/api'

interface Props {
  games: Game[]
  loading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  play: [gameId: string]
}>()

function onGameCardPlay(gameId: string) {
  emit('play', gameId)
}
</script>

<template>
  <div class="game-list">
    <div
      v-if="loading"
      class="game-list__loading"
    >
      Загрузка игр...
    </div>

    <div
      v-else-if="games.length === 0"
      class="game-list__empty"
    >
      Нет доступных игр
    </div>

    <div
      v-else
      class="game-list__grid"
    >
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        @play="onGameCardPlay"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-list {
  width: 100%;

  &__loading,
  &__empty {
    padding: 4rem;
    text-align: center;
    font-size: 1.6rem;
    color: $color-gray;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    gap: 2.4rem;
    padding: 2.4rem;
  }
}

@media (width <= $breakpoint-mobile) {
  .game-list {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      gap: 1.6rem;
      padding: 1.6rem;
    }
  }
}
</style>
