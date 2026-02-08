<template>
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
     
      type="password"
    >
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
      
      type="password"
    >
    </q-input>
  </div>

  <div>
    <q-btn style="margin-top:10px;color:blue" icon="check" outline no-caps :label="t('registrationZa')"></q-btn>
  </div>

  
 

  
</div>
</template>

<script>

import { defineComponent, ref } from "vue";
import { useI18n } from 'vue-i18n'

export default defineComponent ({
setup() {
    const { t } = useI18n()
    const yourLS = ref('')
    const yourPassword = ref('')
    const yourEmail = ref('')
    const yourPassword2 = ref('')
    

    return {
        yourLS,
        yourPassword,
        yourEmail,
        yourPassword2,
        t,
    }
}})

</script>

<style>


</style>