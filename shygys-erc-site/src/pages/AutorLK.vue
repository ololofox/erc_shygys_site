<template>
<div style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); width: clamp(300px, 35vw, 600px); margin: 50px auto; padding: 20px; border: 0px solid #ccc; border-radius: 8px; background: #f9f9f9;">
  <div style="font-size:25px;margin-top:20px">
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
      :label="t('yourLS')" 
    >
    </q-input>
  </div>

  <div style="margin-bottom: 5px;">
    <q-input 
      v-model="yourPassword" 
      outlined
      :label="t('yourPassword')" 
      type="password"
    >
    </q-input>
  </div>

  <div>
    <q-btn style="margin-top:10px;color:blue" no-caps icon="person" outline :label="t('go')"></q-btn>
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
</template>

<script>

import { useI18n } from 'vue-i18n'
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router'


export default defineComponent ({
setup() {
    const { t } = useI18n()
    const yourLS = ref('')
    const yourPassword = ref('')
    const router = useRouter()

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
    }
}})

</script>

<style>


</style>