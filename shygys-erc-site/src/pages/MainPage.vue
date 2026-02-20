<template>
  <q-page class="page-wrapper">

    <div class="tabs-card">
      
      <!-- Вкладки -->
      <q-tabs
        v-model="tab"
        vertical
        dense
        no-caps
        inline-label
        class="tabs-left"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab name="tab1" icon="info" label="О нас"/>
        <q-tab name="tab2" icon="flag" label="Наши цели"/>
        <q-tab name="tab3" icon="contact_mail" label="Контакты"/>
      </q-tabs>

      <!-- Контент -->
      <q-tab-panels v-model="tab" animated class="tab-content">
        
        <q-tab-panel name="tab1">
          <h5>О ЕРЦ Шығыс</h5>
          <div class="panel-box">
          <p>
            ТОО «ЕРЦ Шығыс» - специализированное предприятие, основной задачей которого является совершенствование системы расчетов и сбора платежей за коммунальные услуги.
            
          </p>
          </div>
          <h5>Основные функции ЕРЦ</h5>
          <div class="panel-box">
            — Ведение лицевых счетов;
            — Формирование, печать и доставка счетов-квитанций;
            — Обеспечение приема платежей через банки второго уровня;
            — Обработка платежей;
            — Предоставление оперативных данных о начислениях, платежах, задолженности потребителей;
            — Координация работы абонентских служб поставщиков с потребителями.
          </div>  

          <h5>Преимущества ЕРЦ</h5>
          <div class="panel-box">
          <p>
          По всем коммунальным услугам потребителю приходит единый счет
          Возможность оплаты счета в любом банке
          Для разбора спорных ситуаций необходимо хранить только одну квитанцию

          Мы уделяем особое внимание защите персональных данных наших партнеров и жителей города, используя специализированные средства, гарантирующие полную защиту от несанкционированного доступа.

          Наличие у «ЕРЦ Шығыс» многолетнего опыта работы, современного оборудования и программного обеспечения, а также квалифицированного персонала позволяет с уверенностью смотреть в будущее и улучшать сервисное обслуживание.
          </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tab2">
          <h5>Миссия и цели</h5>
          <div class="panel-box">
          <ul>
            <li>Ведение лицевых счетов</li>
            <li>Формирование и доставка счетов</li>
            <li>Прием платежей через банки</li>
            <li>Обработка платежей</li>
            <li>Предоставление данных о начислениях</li>
            <li>Координация работы абонентских служб</li>
          </ul>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tab3">
          <h5>Реквизиты и контакты</h5>
                      
          <div class="panel-box">
            <h6>  Для абонентов </h6>
            По вопросам, связанным с коммунальными и иными услугами физических лиц (оплата, переоформление, корректировки, консультации), обращаться в Центр городских услуг
            <p>
            
            </p>
            <p>
            </p>
            <p>
            Телефон
            </p>
          </div>

          <div class="panel-box" style="margin-top:20px">
          <h6>  Для поставщиков коммунальных услуг </h6>
          г. Астана, ул. Мамбетова, д. 24, БЦ «Аффари»
          <p>
          Электронная почта канцелярии: secretary@aerc.kz
          </p>
          <p>
          WhatsApp (только для сообщений, звонки не принимаются): +7-777-003-3013
          </p>
          <p>
          Просим при обращении через WhatsApp подробно описывать суть проблемы и прилагать соответствующие скриншоты или документы, чтобы специалисты могли оперативно рассмотреть ваше обращение.
          </p>
          </div>
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
  border-right: 1px solid rgba(0,0,0,0.05);
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
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
}

.panel-box {
  background:rgb(240, 240, 245);
  border-radius: 16px;
  padding: clamp(16px, 2vw, 28px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* лёгкий hover-эффект */
.panel-box:hover {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
</style>