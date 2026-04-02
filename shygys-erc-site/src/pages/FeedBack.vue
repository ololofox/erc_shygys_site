<template>
  <q-page class="main-autor">
    <div style="display: flex; justify-content: cen">
      <div class="feedback-card q-mt-xl q-mb-xl">
        <div class="feedback-header">
          {{ t('hasquestion') }}
          <q-icon name="edit" size="24px" color="primary" class="feedback-icon" />
        </div>

        <q-separator />

        <div class="feedback-field">
          <q-input v-model="yourname" outlined :label="t('yourName')" dense autofocus />
        </div>

        <div class="feedback-field">
          <q-input v-model="yourEmail" outlined :label="t('yourEmail')" dense />
        </div>

        <div class="feedback-field">
          <q-input
            v-model="yourreply"
            outlined
            type="textarea"
            :label="t('textReply')"
            rows="7"
            dense
          />
        </div>

        <div class="button-actions">
          <q-btn
            no-caps
            color="red"
            unelevated
            icon="mail"
            :label="t('send')"
            @click="checkAll()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { defineComponent, ref, getCurrentInstance, watch, onMounted } from 'vue'
import globalMethods from '/src/utils'
import apiRequests from 'src/api'
import { mainStore } from 'src/store/mainStore'

export default defineComponent({
  setup(props, { emit }) {
    const { t, locale } = useI18n()
    const yourname = ref('')
    const yourEmail = ref('')
    const yourreply = ref('')
    const instance = getCurrentInstance()
    const store = mainStore()

    onMounted(() => {
      updateTitle()
    })

    const updateTitle = () => {
      document.title = t('titleFeedBack') + ' | ' + t('title')
    }

    // Слушаем изменения локали
    watch(locale, () => {
      updateTitle()
    })

    const checkAll = () => {
      if (!store.canSendFeedback()) {
        globalMethods.showNotify(instance.proxy.$q, t('timeMailProblem'), 'negative', 'negative')
        return
      }

      if (yourname.value.trim() == '') {
        globalMethods.showNotify(instance.proxy.$q, t('emptyName'), 'negative', 'negative')
        return
      }
      if (checkEmail() == false) {
        return
      }
      if (yourreply.value.trim() == '') {
        globalMethods.showNotify(instance.proxy.$q, t('emptyText'), 'negative', 'negative')
        return
      }
      sendReply()
    }

    const checkEmail = () => {
      if (yourEmail.value.trim() == '') {
        globalMethods.showNotify(instance.proxy.$q, t('emptyEmail'), 'negative', 'negative')
        return false
      }

      if (globalMethods.checkEmail(yourEmail.value) == false) {
        globalMethods.showNotify(instance.proxy.$q, t('uncorrectEmail'), 'negative', 'negative')
        return false
      }
      return true
    }

    const sendReply = async () => {
      emit('isLoadingChanged', true)

      const result = await apiRequests.sendFeed(yourname.value, yourEmail.value, yourreply.value)

      if (result.success) {
        emit('isLoadingChanged', false)
        globalMethods.showNotify(instance.proxy.$q, t('sendMailSuccess'), 'primary', 'positive')
        store.setLastFeedbackTime(new Date())
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
      t,
      yourname,
      yourEmail,
      yourreply,
      checkAll,
      sendReply,
    }
  },
})
</script>

<style>
.feedback-card {
  width: clamp(320px, 50vw, 700px);
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feedback-header {
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #123046;
}

.feedback-icon {
  margin-left: 4px;
}

.feedback-field {
  width: 100%;
}
</style>
