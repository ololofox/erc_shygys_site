<template>
  <q-page>
  <div class="tabs-container">
    <!-- Вкладки слева -->
    <q-tabs
      v-model="tab"
      vertical
      dense
      no-caps
      inline-label
      class="tabs-left"
      active-color="blue"
      indicator-color="#1976d2"
    >
      <q-tab name="tab1" icon="info" label="О нас"/>
      <q-tab name="tab2" icon="person_add" label="Наши цели" />
      <q-tab name="tab3" icon="list" label="Контакты" />
    </q-tabs>

    <!-- Содержимое справа -->
    <q-tab-panels v-model="tab" animated class="tab-content">
      <q-tab-panel name="tab1">
        <h6>Добро пожаловать!</h6>
        <p>
          Товарищество с ограниченной ответственностью «ЕРЦ Шыгыс» информирует о проведении поквартирного обхода жилых домов сотрудниками контролерской службы. Обход осуществляется в рамках соглашений с организациями по вывозу мусора города Астаны с целью актуализации данных о фактическом количестве потребителей коммунальных услуг. Сотрудники контролерской службы имеют при себе служебные удостоверения, подтверждающие их полномочия и деятельность в Товариществе. Просим жителей отнестись с пониманием и благодарим за сотрудничество.
        </p>
      </q-tab-panel>

      <q-tab-panel name="tab2">
        <h6>Цели и задачи</h6>
        <ul>
          <li>Ведение лицевых счетов</li>
          <li>Формирование, печать и доставка счетов-квитанций</li>
          <li>Обеспечение приема платежей через банки второго уровня</li>
          <li>Обработка платежей</li>
          <li>Предоставление оперативных данных о начислениях, платежах, задолженности потребителей</li>
          <li>Координация работы абонентских служб поставщиков с потребителями</li>
        </ul>
      </q-tab-panel>

      <q-tab-panel name="tab3">
        <h6>Настройки приложения</h6>
        <p>
          Здесь можно менять темы, язык, уведомления и другие параметры приложения.
        </p>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('tab1')
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: row;
  height: 60vh;             /* адаптивная высота */
  max-height: 600px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  background-color: #fff;
  transition: all 0.3s ease;
}

/* Вкладки слева */
.tabs-left {
  min-width: 180px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  transition: background 0.3s;
}

.q-tab {
  font-size: clamp(14px, 1.2vw, 16px);
  padding: 10px clamp(8px, 1vw, 16px);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.q-tab:hover {
  background-color: rgba(25, 118, 210, 0.1);
  cursor: pointer;
}

/* Контент справа */
.tab-content {
  flex: 1;
  padding: clamp(10px, 2vw, 20px);
  overflow-y: auto;       /* скролл при переполнении */
}

.tab-content h6 {
  font-size: clamp(16px, 1.8vw, 22px);
  margin-bottom: 0.5rem;
  color: #1976d2;
}

.tab-content p, .tab-content li {
  font-size: clamp(14px, 1.4vw, 16px);
  line-height: 1.6;
  color: #333;
}

.tab-content ul {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

/* Скроллбар для красоты */
.tab-content::-webkit-scrollbar {
  width: 8px;
}

.tab-content::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}

.tab-content::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
}

/* Адаптив на мобильных */
@media(max-width: 768px) {
  .tabs-container {
    flex-direction: column;
    height: auto;
  }

  .tabs-left {
    min-width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .q-tab {
    text-align: center;
  }
}
</style>