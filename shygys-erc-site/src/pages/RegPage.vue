<template>
 <q-page>
<div style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); width: clamp(300px, 35vw, 600px); margin: 50px auto; padding: 20px; border: 0px solid #ccc; border-radius: 8px; background: #f9f9f9;">
  <div style="font-size:25px;margin-top:20px">
    {{t('registrationTitle')}}
    <q-icon 
        name="how_to_reg" 
        size="24px" 
        color="primary" 
    />
    </div>
  <hr>
  
  <div style="margin-bottom: 5px;">    
    <q-input 
      v-model="yourLS"
      outlined
      :label="t('yourLS')" 
      @vue:before-update="changeNumber"
    >
    </q-input>
  </div>

  <div style="margin-bottom: 5px;">    
    <q-input 
      v-model="yourEmail"
      outlined
      :label="t('yourEmail')" 
     
    >
    </q-input>
  </div>

  <div style="margin-bottom: 5px;">
    <q-input 
      v-model="yourPassword" 
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
    <div style="color:blue;margin-left:10px;margin-top:5px">
        {{t('passwordLength')}}
    </div>
  </div>

  <div style="margin-bottom: 5px;">
    <q-input 
      v-model="yourPassword2" 
      outlined
      :label="t('yourPassword2')" 
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

  <div>
    <q-btn style="margin-top:10px;color:blue" icon="check" outline no-caps :label="t('registrationZa')" @click="checkAll"></q-btn>
  </div>

  
 

  
</div>
</q-page>
</template>

<script>

import { defineComponent, ref, getCurrentInstance } from "vue";
import { useI18n } from 'vue-i18n'
import globalMethods from "src/utils";
import apiRequests from "src/api";
import { useRouter } from 'vue-router'


export default defineComponent ({
setup(props, { emit }) {
    const { t } = useI18n()
    const yourLS = ref('')
    const yourPassword = ref('')
    const yourEmail = ref('')
    const yourPassword2 = ref('')
    const router = useRouter()

    const instance = getCurrentInstance()

    const changeNumber = () => {
        yourLS.value = yourLS.value.replace(/\D/g, '')      
    }

    const checkAll = () => {
        if (yourLS.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('enterLS'), 'negative', 'negative')
            return
        }

        if (yourEmail.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('emptyEmail'), 'negative', 'negative')
            return
        }
        
        if (globalMethods.checkEmail(yourEmail.value) == false) {
            globalMethods.showNotify(instance.proxy.$q, t('uncorrectEmail'), 'negative', 'negative')
            return
        }

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

        tryRegistration()
    }

    const tryRegistration = async () => {
      const userData = {
        Login: yourLS.value,
        Password: yourPassword.value,
        Email: yourEmail.value
      }

      emit("isLoadingChanged", true)
      const result = await apiRequests.userRegistration(userData)

      if (result.success) {
          emit("isLoadingChanged", false)
          // зарегистрировались и авторизовались
          //globalMethods.showNotify(instance.proxy.$q, t('wellDoneRegistration'), 'positive', 'primary')
          router.push('/cabinet')
      } else {
          emit("isLoadingChanged", false)  
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
          return
      }
    }

    

    return {
        yourLS,
        yourPassword,
        yourEmail,
        yourPassword2,
        changeNumber,
        t,
        checkAll,
        isPwd: ref(true),
        isPwd2: ref(true),
    }
}})

</script>

<style>


</style>