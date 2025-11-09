<script setup lang="ts">
interface Props {
  id?: string
  modelValue: string
  type?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :id="props.id"
    :value="props.modelValue"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    class="base-input"
    @input="onInput"
  >
</template>

<style scoped lang="scss">
.base-input {
  width: 100%;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  border: 0.2rem solid $color-gray-lightest;
  border-radius: 0.8rem;
  transition: all 0.2s;
  background: $color-white;
  color: $color-black;

  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: $color-background;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: $color-gray-light;
  }
}
</style>

