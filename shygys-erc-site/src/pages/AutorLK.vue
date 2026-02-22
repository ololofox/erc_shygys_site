<template>
 <q-page style="display: flex;justify-content: center;align-items: center;">

  <div style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); width: clamp(300px, 35vw, 600px); margin: 50px auto; padding: 20px; border: 0px solid #ccc; border-radius: 8px; background: #f9f9f9;">
  <div style="font-size:25px;margin-top:20px;color: #123046;font-weight: 600;font-size: clamp(20px, 2.5vw, 28px);">
    {{t('autorizationPlease')}}
    <q-icon 
        name="lock_open" 
        size="24px" 
        color="primary" 
    />
    </div>
  <hr>
  <div style="margin-bottom: 5px;">    
    <q-input 
      v-model="yourLS"
      outlined
      dense
      :label="t('yourLS')" 
      @vue:before-update="changeNumber"
    >
    </q-input>
  </div>

  <div style="margin-bottom: 5px;">
    <q-input 
      v-model="yourPassword" 
      toggle-password
      dense
      outlined
      :label="t('yourPassword')"       
      :type="isPwd ? 'password' : 'text'"
    >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
    </q-input>
  </div>

  <div class="button-actions" style="justify-content: left;">
    <q-btn style="margin-top:10px;" color="primary" no-caps icon="person" unelevated :label="t('go')" @click="checkAll()"></q-btn>
  </div>

  <div style="margin-top:10px;display:flex;justify-content: center;">
    <q-btn
        flat
        dense
        no-caps  
        color="blue"
        :label="t('recoverPasswordTitle')"
        @click="goRecover"
    />

    <q-btn
        flat
        dense
        no-caps  
        
        color="red"
        style="font-weight:500;"
        :label="t('registration')"
        @click="goReg"
    />  
</div>  
  

  </div>

</q-page>
</template>

<script>

import { useI18n } from 'vue-i18n'
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'
import globalMethods from 'src/utils';
import { mainStore } from 'src/store/mainStore' 
//import cookies from "src/cookies";
import apiRequests from "src/api";


export default defineComponent ({
setup(props, {emit}) {
    const { t } = useI18n()
    const instance = getCurrentInstance()
    const yourLS = ref('')
    const yourPassword = ref('')
    const router = useRouter()
    const store = mainStore()


    const sendAutor = async () => {
      const userData = {
        Login: yourLS.value,
        Password: yourPassword.value,        
      }

      emit("isLoadingChanged", true)
      const result = await apiRequests.userAutorization(userData)

      if (result.success) {
          emit("isLoadingChanged", false)
          // авторизовались
          //globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'positive', 'positive')
          router.push('/cabinet')
      } else {
          emit("isLoadingChanged", false)  
          // что-то пошло не так
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
          return
      }  
      
    }

    const checkAll = () => {
        if (yourLS.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('enterLS'), 'negative', 'negative')
            return
        }
        if (yourPassword.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('enterPassword'), 'negative', 'negative')
            return
        }
        sendAutor()
    }

    const changeNumber = () => {
        yourLS.value = yourLS.value.replace(/\D/g, '')      
    }

    const goReg = () => {
        router.push('/reg')      
    }

    const goRecover = () => {
        router.push('/recover')
    }

    return {
        t,
        yourLS,
        yourPassword,
        router,
        goReg,
        goRecover,
        checkAll,
        changeNumber,
        isPwd: ref(true),
        store
    }
}})

</script>

<style>
  .main-autor {
      display: flex;
      justify-content: center;
      align-items: center;
  }
</style>