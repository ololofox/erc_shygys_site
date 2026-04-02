<template>
  <q-page class="page-wrapper">
    <div class="tabs-card">
      <!-- Вкладки -->
      <q-tabs
        style="align-items: flex-start"
        v-model="tab"
        vertical
        dense
        no-caps
        inline-label
        class="tabs-left"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="tab1" icon="info" :label="t('aboutCompanyTitle')" />
        <q-tab name="tab2" icon="list" :label="t('functionsCompanyTitle')" />
        <q-tab name="tab3" icon="contact_mail" :label="t('contactsCompanyTitle')" />
      </q-tabs>

      <!-- Контент -->
      <q-tab-panels v-model="tab" animated class="tab-content">
        <q-tab-panel name="tab1">
          <h5>{{ t('aboutCompanyTitle') }}</h5>
          <div class="panel-box">
            <p>
              {{ t('aboutCompanyText') }}
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tab2">
          <h5>{{ t('functionsCompanyTitle') }}</h5>
          <div class="panel-box" style="white-space: pre-line">
            <p>
              {{ t('functionsCompanyText') }}
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tab3">
          <h5>{{ t('contactsCompanyTitle') }}</h5>
          <div class="panel-box" style="white-space: pre-line">
            <p>
              {{ t('contactsCompanyText') }}
            </p>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const tab = ref('tab1')
    const { t, locale } = useI18n()

    onMounted(() => {
      updateTitle()
    })

    const updateTitle = () => {
      document.title = t('titleMain') + ' | ' + t('title')
    }

    // Слушаем изменения локали
    watch(
      () => locale.value, // обязательно обращаемся к .value
      () => {
        updateTitle()
      },
    )

    return {
      tab,
      locale,
      t,
    }
  },
})
</script>

<style scoped>
.page-wrapper {
  padding: 0;
  background: linear-gradient(135deg, #f5f7fa, #eef2f7);
  min-height: calc(100vh - 0px);
}

/* Основная карточка */
.tabs-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 400px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Левая панель */
.tabs-left {
  min-width: 220px;
  background: #fafafa;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 10px;
}

/* Стили вкладок */
.q-tab {
  border-radius: 12px;
  margin-bottom: 6px;
  transition: all 0.25s ease;
  font-weight: 500;
}

.q-tab:hover {
  background: rgba(25, 118, 210, 0.08);
}

/* Контент */
.tab-content {
  flex: 1;
  padding: 0 clamp(20px, 3vw, 40px) clamp(20px, 3vw, 40px);
}

/* Заголовки */
.tab-content h5 {
  font-weight: 600;
  margin-bottom: 15px;

  color: #1976d2;
}

/* Текст */
.tab-content p,
.tab-content li {
  font-size: clamp(14px, 1.2vw, 16px);
  line-height: 1.7;
  color: #444;
}

.tab-content ul {
  padding-left: 20px;
  margin-top: 10px;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .tabs-card {
    flex-direction: column;
  }

  .tabs-left {
    min-width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

/* лёгкий hover-эффект */
.panel-box:hover {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
</style>
