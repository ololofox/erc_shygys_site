<template>
<q-page>
<div style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); width: clamp(300px, 35vw, 600px); margin: 50px auto; padding: 20px; border: 0px solid #ccc; border-radius: 8px; background: #f9f9f9;">
  <div style="font-size:25px;margin-top:20px">
    {{t('recoverPasswordTitle')}}
    <q-icon 
        name="build" 
        size="24px" 
        color="primary" 
    />
    </div>
    <div style="font-size:15px;margin-top:5px">
        {{ t('recoverPasswordTitleInfo') }}
    </div>
  <hr>
  
  
  <div style="margin-bottom: 5px;">    
    <q-input 
      v-model="yourEmail"
      outlined
      :label="t('yourEmail')" 
     
    >
    </q-input>
  </div>

  


  

  <div>
    <q-btn 
        style="margin-top:10px;
        color:blue" 
        icon="check" 
        outline 
        no-caps 
        :label="t('send')" 
        @click="checkEmail()"
        v-if="isButtonVisible"
    >
    </q-btn>
  </div>

  
 

  
</div>
</q-page>
</template>

<script>

import { defineComponent, ref, getCurrentInstance } from "vue";
import { useI18n } from 'vue-i18n'
import globalMethods from '/src/utils'

export default defineComponent ({
setup() {
    const { t } = useI18n()
    const instance = getCurrentInstance();
    const yourPassword = ref('')
    const yourEmail = ref('')
    const yourPassword2 = ref('')
    const isButtonVisible = ref('true')
    
    

    const getEmail = () => {
        globalMethods.showNotify(instance.proxy.$q,  t('ifRealEmail'), 'positive', 'positive')
        //isButtonVisible.value = false
    };

    const checkEmail = () => {
        if (yourEmail.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('emptyEmail'), 'negative', 'negative')
            return
        }
       
        if (globalMethods.checkEmail(yourEmail.value) == false) {
            globalMethods.showNotify(instance.proxy.$q, t('uncorrectEmail'), 'negative', 'negative')
            return
        }
        
        getEmail()
    }
    

    return {
        isButtonVisible,
        yourPassword,
        yourEmail,
        yourPassword2,
        getEmail,
        checkEmail,
        t,
    }
}})

</script>

<style>


</style>