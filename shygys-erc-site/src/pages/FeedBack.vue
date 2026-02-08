<template>
<div style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);width: clamp(300px, 50vw, 800px); margin: 50px auto; padding: 20px; border: 0px solid #ccc; border-radius: 8px; background: #f9f9f9;">
  
<div style="font-size:25px;margin-top:20px">
{{t('hasquestion')}}
<q-icon 
        name="edit" 
        size="24px" 
        color="primary" 
    />
</div>
<hr>

  <div style="margin-bottom: 5px;">    
    <q-input 
      v-model="yourname"
      outlined
      :label="t('yourName')" 
    >
    </q-input>
  </div>

  <div style="margin-bottom: 5px;">
    <q-input 
      v-model="youremail" 
      outlined
      :label="t('yourEmail')" 
    >
    </q-input>
  </div>

  <div>    
    <q-input 
      v-model="yourreply"
      outlined 
      type="textarea" 
      :label="t('textReply')" 
      rows="7" 
      style="width:100%; 
      border-radius:4px; 
      "
    >
    </q-input>
  </div>

  <div>
    <q-btn style="margin-top:10px" no-caps color="red" outline icon="mail" :label="t('send')"></q-btn>
  </div>
</div>
</template>

<script>

import { useI18n } from 'vue-i18n'
import { defineComponent, ref } from "vue";

export default defineComponent ({
setup() {
    const { t } = useI18n()
    const yourname = ref('')
    const youremail = ref('')
    const yourreply = ref('')
    return {
        t,
        yourname,
        youremail,
        yourreply,
    }
}})

</script>

