<template>
    
      
    <q-layout view="hHh Lpr fFf">

    <!-- HEADER -->
     
    <q-header elevated class="app-header">
      <teleport to="body">
        <div class="global-overlay" v-if="isLoading" >
          <div style="position:absolute; top:50%; left:50%; transform: translate(-50%,-50%);">
            <q-spinner-facebook
              color="yellow"
              size="4em"
            />
          </div>
        </div>
      </teleport>
      
      <LanguageSwitcher />

      <!-- Картинка с текстом -->
      <div class="header-image">
        <img src="/header__.png" alt="header" />

        <div class="header-overlay">
          <div class="header-text">
            <h1 class="header-title main-title">{{t('title')}}</h1>
            <h3 class="header-title sub-title">
              {{t('secondTitle')}}
            </h3>
          </div>
        </div>
      </div>

      <!-- Меню -->
      <q-tabs 
        :model-value="activeTab"
        inline-label 
        no-caps    
        :breakpoint="0"
        class="app-tabs"
      >
        <q-tab name="main" icon="home" :label="t('home')" @click="goMain" />
        <q-tab name="feedback" icon="mail" :label="t('feedback')" @click="goFeedback"  />              
        <q-tab name="autor" icon="person" :label="t('personalAccount')" @click="goAutor" />              
      </q-tabs>

    </q-header>

    <!-- BODY -->
    <q-page-container v-show="!isInfoLoading">
      
<!-- Overlay для спиннера -->



          <router-view @isLoadingChanged="handleIsLoadingChange"  @isInfoLoadingChanged="handleIsInfoLoadingChange" />

    </q-page-container>

  </q-layout>


</template>

<script>
import LanguageSwitcher from "components/LanguageSwitcher.vue";
import { useI18n } from 'vue-i18n'
import { defineComponent, watch, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import cookies from "src/cookies";

export default defineComponent({
  components: {
    LanguageSwitcher
  },
  setup() {
    const { t, locale } = useI18n();
    const isLoading = ref(false);
    const isInfoLoading = ref(false);
    const router = useRouter();
    const route = useRoute();

    const updateTitle = () => {
      document.title = t('titleBrow');
    };

    const activeTab = computed(() => route.meta.section ?? 'main')

    const goMain = () => {
        router.push({ name: 'main' })
    }

    const goFeedback = () => {
        router.push({ name: 'feedback' })
    }

    const goAutor = () => {
        const lss = cookies.getValue('ls')

        if (lss != null) {
            router.push({ name: 'cabinet' })
        } else {
            router.push({ name: 'autoriz' })
        }
    }


    // Слушаем изменения локали
    watch(locale, () => {
      updateTitle();
    });

    const handleIsLoadingChange = (newValue) => {
      isLoading.value = newValue
    }

    const handleIsInfoLoadingChange = (newValue) => {
      isInfoLoading.value = newValue
    }

    return {
      t,
      locale,
      isLoading,
      isInfoLoading,
      router,
      activeTab,
      handleIsLoadingChange,
      handleIsInfoLoadingChange,
      goAutor,
      goFeedback,
      goMain
    }
  }
})
</script>

<style scoped>
/* Хедер */
.app-header {
  min-height: clamp(150px, 32vw, 300px);
  max-height: 300px;
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

.app-tabs {
 
  font-weight: 500;
  
  background:rgb(18, 72, 94);
  
  padding: 8px;

}

.app-tabs .q-tab {
  border-radius: 14px;
  transition: all 0.3s ease;
}

.app-tabs .q-tab--active {
  background: rgba(190, 190, 190, 0.555);
  text-shadow: 0 0 6px rgba(25, 118, 210, 0.5);
}

.app-tabs .q-tab:hover {
  transform: translateY(-2px);
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