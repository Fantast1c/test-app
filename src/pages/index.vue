<script setup lang="ts">
import type { Game } from '~/types/api'
import { fetchGames as fetchGamesApi, fetchGameSession } from '~/api/authApi'
import { DEFAULT_CURRENCY } from '~/api/config'
import { useAuthStore } from '~/composables/auth'
import { useToastError } from '~/composables/toastError'
import { UnauthorizedError } from '~/utils/handleApiError'

defineOptions({
  name: 'HomePage',
})

const router = useRouter()
const authStore = useAuthStore()
const { state } = authStore
const { showError } = useToastError()

const formattedBalance = computed(() => {
  if (!state.balance) {
    return undefined
  }

  const currency = state.currency || DEFAULT_CURRENCY
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(state.balance)
})

const games = ref<Game[]>([])
const isLoadingGames = ref(false)

async function loadGames() {
  isLoadingGames.value = true

  try {
    const response = await fetchGamesApi()
    games.value = response.data || []
  }
  catch (err) {
    if (err instanceof UnauthorizedError) {
      handleUnauthorized()
      return
    }

    console.error('Failed to load games:', err)
    showError('Не удалось загрузить список игр')
  }
  finally {
    isLoadingGames.value = false
  }
}

async function onGamePlay(gameId: string) {
  if (!state.token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetchGameSession(gameId, state.token, DEFAULT_CURRENCY)
    const gameUrl = response.data[0].attributes['launch-options']['game-url']

    if (!gameUrl) {
      console.error('Game URL not found in response')
      showError('Не удалось получить ссылку на игру')
      return
    }

    window.open(gameUrl, '_blank')
  }
  catch (err) {
    if (err instanceof UnauthorizedError) {
      handleUnauthorized()
      return
    }

    console.error('Failed to start game:', err)
    showError('Не удалось запустить игру')
  }
}

function handleUnauthorized() {
  authStore.logout()
  showError('Пользователь не авторизован')
}

onMounted(async () => {
  authStore.restoreSession()

  if (!state.isAuthenticated) {
    router.push('/login')
    return
  }

  await loadGames()
})
</script>

<template>
  <div class="home-page">
    <AppSidebar
      :title="state.username ?? undefined"
      :balance="formattedBalance"
      class="home-page__sidebar"
    >
      <BaseButton
        theme="danger"
        tabindex="-1"
        @click="authStore.logout"
      >
        Выйти
      </BaseButton>
    </AppSidebar>

    <MainWrapper>
      <GameList
        :games="games"
        :loading="isLoadingGames"
        @play="onGamePlay"
      />
    </MainWrapper>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: grid;
  grid-template-columns: 32rem 1fr;
  height: 100vh;
  background: $color-background;

  &__sidebar {
    grid-column: 1;
  }
}

@media (width <= $breakpoint-mobile) {
  .home-page {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    &__sidebar {
      grid-column: 1;
      grid-row: 1;
      border-right: none;
      border-bottom: 0.1rem solid $color-gray-lightest;
    }
  }
}
</style>
