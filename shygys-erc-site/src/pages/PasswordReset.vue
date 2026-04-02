<template>
  <q-page class="main-autor">
    <div
      style="
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        width: clamp(300px, 35vw, 600px);
        margin: 50px auto;
        padding: 20px;
        border: 0px solid #ccc;
        border-radius: 8px;
        background: #f9f9f9;
      "
    >
      <div
        style="
          font-size: 25px;
          margin-top: 20px;
          color: #123046;
          font-weight: 600;
          font-size: clamp(20px, 2.5vw, 28px);
        "
      >
        {{ t('passwordReset') }}
        <q-icon name="refresh" size="24px" color="primary" />
      </div>
      <hr />

      <div style="margin-bottom: 5px">
        <q-input
          v-model="yourPassword"
          outlined
          dense
          :label="t('yourPassword')"
          :type="isPwd ? 'password' : 'text'"
          @keydown.enter.prevent="checkAll"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
        <div style="color: blue; margin-left: 10px; margin-top: 5px">
          {{ t('passwordLength') }}
        </div>
      </div>

      <div style="margin-bottom: 5px">
        <q-input
          v-model="yourPassword2"
          outlined
          dense
          :label="t('yourPassword2')"
          @keydown.enter.prevent="checkAll"
          :type="isPwd2 ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            ></q-icon>
          </template>
        </q-input>
      </div>

      <div class="button-actions" style="display: flex; justify-content: left">
        <q-btn
          style="margin-top: 10px"
          color="blue"
          icon="check"
          no-caps
          :label="t('changePassword')"
          @click="checkAll"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import globalMethods from 'src/utils'
import apiRequests from 'src/api'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup(props, { emit }) {
    const { t, locale } = useI18n()
    const yourPassword = ref('')
    const yourPassword2 = ref('')
    const router = useRouter()
    const route = useRoute()
    const instance = getCurrentInstance()

    const token = route.query.token
    const login = route.query.login

    onMounted(async () => {
      updateTitle()
      emit('isLoadingChanged', true)
      emit('isInfoLoadingChanged', true)

      const result = await apiRequests.checkMailToken(login, token)

      if (result.success) {
        emit('isLoadingChanged', false)
        emit('isInfoLoadingChanged', false)
      } else {
        emit('isLoadingChanged', false)
        emit('isInfoLoadingChanged', false)
        // что-то пошло не так
        globalMethods.showNotify(
          instance.proxy.$q,
          t(result.data.messagelocale),
          'negative',
          'negative',
        )
        router.push('/autor')
        console.log(result)
      }
    })

    const updateTitle = () => {
      document.title = t('titlePasswordReset') + ' | ' + t('title')
    }

    // Слушаем изменения локали
    watch(locale, () => {
      updateTitle()
    })

    const checkAll = () => {
      if (yourPassword.value.trim() == '') {
        globalMethods.showNotify(instance.proxy.$q, t('enterPassword'), 'negative', 'negative')
        return
      }

      if (yourPassword.value.length < 8) {
        globalMethods.showNotify(instance.proxy.$q, t('shortPassword'), 'negative', 'negative')
        return
      }

      if (yourPassword2.value.trim() == '') {
        globalMethods.showNotify(instance.proxy.$q, t('enterPassword2'), 'negative', 'negative')
        return
      }

      if (!(yourPassword2.value.trim() == yourPassword.value.trim())) {
        globalMethods.showNotify(instance.proxy.$q, t('passwordsNotEqual'), 'negative', 'negative')
        return
      }

      resetPassword()
    }

    const resetPassword = async () => {
      emit('isLoadingChanged', true)

      const result = await apiRequests.resetPassword(login, yourPassword.value, yourPassword2.value)

      if (result.success) {
        emit('isLoadingChanged', false)
        globalMethods.showNotify(
          instance.proxy.$q,
          t('changePasswordSuccess'),
          'primary',
          'positive',
        )
        router.push('/autor')
      } else {
        emit('isLoadingChanged', false)
        // что-то пошло не так
        globalMethods.showNotify(
          instance.proxy.$q,
          t(result.data.messagelocale),
          'negative',
          'negative',
        )
        console.log(result.data)
      }
    }

    return {
      yourPassword,
      yourPassword2,
      checkAll,
      resetPassword,
      t,
      isPwd: ref(true),
      isPwd2: ref(true),
      token,
      login,
    }
  },
})
</script>

<style scoped></style>
