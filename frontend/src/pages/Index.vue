<template>
  <q-page class="row items-center justify-evenly">
    <q-input label="email" v-model="email" />
    <q-input label="senha" v-model="password" type="password"/>
    <q-btn @click="onLogin" label="Login" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from 'src/helper/RequestHelper'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()
const email = ref<string>('')
const password = ref<string>('')

const onLogin = async () => {
  try {
    await useRequest.post('auth', {
      email: email.value,
      password: password.value
    })
    router.push('/home')
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Bad Request'
    })
  }
}

</script>
