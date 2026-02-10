<template>
  <q-layout view="hHh Lpr fFf">

    

    <!-- HEADER -->
    <q-header elevated class="app-header">


      <!-- Overlay для спиннера -->
      <div class="overlay" v-if="isLoading">
        <div style="position:absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
          <q-spinner-facebook
            color="yellow"
            size="4em"
          />
        </div>
      </div>

      <LanguageSwitcher />

      <!-- Картинка с текстом -->
      <div class="header-image">
        <img src="/header__.png" alt="header" />

        <div class="header-overlay">
          <div class="header-text">
            <h1 class="header-title main-title">ТОО "ЕРЦ Шыгыс"</h1>
            <h3 class="header-title sub-title">
              Мы разнесем все, что можно и нельзя
            </h3>
          </div>
        </div>
      </div>

      <!-- Меню -->
      <q-tabs 
        v-model="activeTab"
        inline-label 
        no-caps    
        :breakpoint="0"
        class="app-tabs"
      >
        <q-tab name="main" icon="home" :label="t('home')" />
        <q-tab name="feedback" icon="mail" :label="t('feedback')"  />              
        <q-tab name="autor" icon="person" :label="t('personalAccount')" />              
      </q-tabs>

    </q-header>

    <!-- BODY -->
    <q-page-container >
      
          <router-view @isLoadingChanged="handleIsLoadingChange" />

    </q-page-container>

  </q-layout>
</template>

<script>
import LanguageSwitcher from "components/LanguageSwitcher.vue";
import { useI18n } from 'vue-i18n'
import { defineComponent, watch, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
  
export default defineComponent({
  components: {
    LanguageSwitcher
  },
  setup() {
    const { t, locale } = useI18n();
    const isLoading = ref(false);
    const router = useRouter();
    const route = useRoute();

    const updateTitle = () => {
      document.title = t('titleBrow');
    };

    const activeTab = computed({
      get: () => route.meta.section,
      set: (val) => {
          // при изменении меняем роут
          if (val === 'main') router.push({ name: 'main' })
          if (val === 'feedback') router.push({ name: 'feedback' })
          if (val === 'autor') router.push({ name: 'autor' })
        }
      })
    // Слушаем изменения локали
    watch(locale, () => {
      updateTitle();
    });

    const handleIsLoadingChange = (newValue) => {
      isLoading.value = newValue
    }

    return {
      t,
      locale,
      isLoading,
      router,
      activeTab,
      handleIsLoadingChange
    }
  }
})
</script>

<style scoped>
/* Хедер */
.app-header {
  min-height: clamp(150px, 30vw, 260px);
  max-height: 260px;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Картинка */
.header-image {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Затемнение + текст */
.header-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.8vw, 10px);
  padding-left: clamp(20px, 6vw, 80px);
  max-width: clamp(220px, 40vw, 600px);
}

.main-title {
  font-size: clamp(20px, 3vw, 36px);
  line-height: 1.1;
  margin: 0;
  color: white;
  font-weight: 600;
}

.sub-title {
  font-size: clamp(12px, 2vw, 20px);
  line-height: 1.2;
  margin: 0;
  color: white;
  opacity: 0.9;
}

/* Табсы */
.app-tabs {
  background-color: slategrey;
  
}

.app-tabs .q-tab__label {
  font-size: 16px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>