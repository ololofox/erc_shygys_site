<template>
  <q-page>

    <div style="
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        margin: 50px auto;
        margin-left:clamp(0px, 4vw, 30px);
        margin-right:clamp(0px, 4vw, 30px);
        padding: 20px;
        border: 0px solid #ccc;
        border-radius: 8px;
        background: #f9f9f9;
      "> <!-- Вкладки -->

      <q-carousel v-model="slide" height="auto" swipeable animated :control-type="controlType" control-color="primary"
        navigation padding arrows class="text-primary rounded-borders" transition-prev="scale" transition-next="scale">
        <q-carousel-slide name="about" class="column no-wrap flex-center">
          <div style="
                  width:100%;
                  margin-top:20px;
                  margin-bottom:20px;
                  color: #123046;
                  font-weight: 600;
                  font-size: clamp(20px, 2.5vw, 28px);
              ">
            {{ t('aboutCompanyTitle') }}
          </div>

          <div style="font-size:14px;color: #123046;">
            <p>{{ t('aboutCompanyText') }}</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="functions" class="column no-wrap flex-center">
          <div style="
                  width:100%;
                  margin-top:20px;
                  margin-bottom:20px;
                  color: #123046;
                  font-weight: 600;
                  font-size: clamp(20px, 2.5vw, 28px);
              ">

            {{ t('functionsCompanyTitle') }}
          </div>
          <p style="white-space: pre-line; font-size:14px;color: #123046;">
            {{ t('functionsCompanyText') }}
          </p>
        </q-carousel-slide>
        <q-carousel-slide name="contacts" class="column no-wrap flex-center">
          <div style="
                  width:100%;
                  margin-top:20px;
                  margin-bottom:20px;
                  color: #123046;
                  font-weight: 600;
                  font-size: clamp(20px, 2.5vw, 28px);
              ">
            {{ t('contactsCompanyTitle') }}
          </div>
          <p style="white-space: pre-line;font-size:14px;color: #123046;">
            {{ t('contactsCompanyText') }}
          </p>
        </q-carousel-slide>

      </q-carousel>

    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  emits: ['isTitleChanged'],
  setup(props, { emit }) {
    const tab = ref('tab1')
    const { t, locale } = useI18n()
    const slide = ref('aboout')
    const controlType = ref('flat')

    const updateTitle = () => {
      document.title = t('titleMain') + ' | ' + t('title')
      emit('isTitleChanged', t('titleMain'))
    }

    onMounted(() => {
      updateTitle()
      slide.value = 'about'
    })

    watch(
      () => locale.value,
      () => {
        updateTitle()
      }
    )

    return {
      tab,
      locale,
      t,
      slide,
      controlType
    }
  }
})
</script>

<style scoped>
.page-wrapper {
  padding: 16px;
}

.tabs-card {
  display: flex;
  flex-direction: column;
}

.tab-content {
  margin-top: 5px;
}

.q-tab {
  border-radius: 12px;
  margin: 4px;
  background: #f5f5f5;
  transition: all 0.2s ease;
}


.q-tab--active {
  transform: scale(1);
  font-weight: 600;
}

.q-tab:not(.q-tab--active) {
  opacity: 0.4;
  transform: scale(0.5);
}
</style>