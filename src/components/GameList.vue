<script setup lang="ts">
import type { Game } from '~/types/api'

interface Props {
  games: Game[]
  loading?: boolean
  loadingGameId?: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  play: [gameId: string]
}>()

function onGameCardPlay(gameId: string) {
  emit('play', gameId)
}
</script>

<template>
  <div
    v-if="loading"
    class="game-list-loading"
  >
    Загрузка игр...
  </div>

  <div
    v-else-if="games.length === 0"
    class="game-list-empty"
  >
    Нет доступных игр
  </div>

  <div
    v-else
    class="game-list"
  >
    <GameCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      :loading="props.loadingGameId === game.id"
      @play="onGameCardPlay"
    />
  </div>
</template>

<style scoped lang="scss">
.game-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  gap: 2.4rem;
  padding: 2.4rem;

  &-loading,
  &-empty {
    padding: 4rem;
    text-align: center;
    font-size: 1.6rem;
    color: $color-gray;
  }
}

@media (width <= $breakpoint-mobile) {
  .game-list {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.6rem;
    padding: 1.6rem;
  }
}
</style>
