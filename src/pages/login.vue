<script setup lang="ts">
import { useAuthStore } from '~/composables/auth'
import { useToastError } from '~/composables/toastError'

defineOptions({
  name: 'LoginPage',
})

const router = useRouter()
const authStore = useAuthStore()
const { showError } = useToastError()

const username = ref('')
const password = ref('')
const isLoading = ref(false)

async function onFormSubmit() {
  if (!username.value || !password.value) {
    showError('Пожалуйста, заполните все поля')
    return
  }

  isLoading.value = true

  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  }
  catch {
    showError('Неверный логин или пароль')
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__container">
      <div class="login-card">
        <h1 class="login-card__title">
          Вход
        </h1>

        <form
          class="login-form"
          @submit.prevent="onFormSubmit"
        >
          <div class="login-form__field">
            <label
              for="username"
              class="login-form__label"
            >
              Логин
            </label>
            <BaseInput
              id="username"
              v-model="username"
              type="text"
              placeholder="Введите логин"
              :disabled="isLoading"
            />
          </div>

          <div class="login-form__field">
            <label
              for="password"
              class="login-form__label"
            >
              Пароль
            </label>
            <BaseInput
              id="password"
              v-model="password"
              type="password"
              placeholder="Введите пароль"
              :disabled="isLoading"
            />
          </div>

          <BaseButton
            theme="primary"
            type="submit"
            :disabled="isLoading"
            class="login-form__submit"
          >
            {{ isLoading ? 'Загрузка...' : 'Войти' }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gradient-primary;
  padding: 2rem;

  &__container {
    width: 100%;
    max-width: 42rem;
  }
}

.login-card {
  background: $color-white;
  border-radius: 1.6rem;
  padding: 4rem;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.15);

  &__title {
    font-size: 3.2rem;
    font-weight: 700;
    text-align: center;
    margin: 0 0 3.2rem;
    color: $color-black;
  }

  &__hint {
    margin-top: 2.4rem;
    padding: 1.2rem;
    background: $color-background;
    border-radius: 0.8rem;
    text-align: center;
    font-size: 1.4rem;
    color: $color-gray;
  }
}

.login-form {
  &__field {
    margin-bottom: 2.4rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: $color-gray-dark;
  }

  &__submit {
    width: 100%;
    padding: 1.4rem;
    font-size: 1.6rem;
  }
}
</style>
