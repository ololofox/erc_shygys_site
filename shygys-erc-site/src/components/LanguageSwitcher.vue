<template>
  <div class="language-switcher">
    <button
      v-for="lang in languagesAr"
      :key="lang.value"
      @click="changeLanguage(lang.value)"
      :class="['lang-btn', { active: currentLanguage === lang.value }]"
    >
      
      {{ lang.label }}
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import cookies from "/src/cookies"

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()

    const languagesAr = ref([
      { label: "RU", value: "ru", img: "/icons/ru.png" },
      { label: "KZ", value: "kz", img: "/icons/kz.png" },
    ])

    const currentLanguage = ref('')

    const changeLanguage = (code) => {
      currentLanguage.value = code
      locale.value = code
      cookies.setValue('curlang', code)
    }

    onMounted(() => {
      const savedLocale = cookies.getValue('curlang') || 'ru'
      currentLanguage.value = savedLocale
      locale.value = savedLocale
    })

    return {
      languagesAr,
      currentLanguage,
      changeLanguage
    }
  }
}
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 5px;
  z-index: 1000;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.lang-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.lang-btn.active {
  background-color: rgba(255, 255, 255, 0.4);
  font-weight: bold;
}

.small-img {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
</style>