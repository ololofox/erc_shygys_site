<template>
  <q-page>
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
      v-model="yourEmail" 
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
    <q-btn style="margin-top:10px" no-caps color="red" outline icon="mail" :label="t('send')" @click="checkAll()"></q-btn>
  </div>
</div>
</q-page>
</template>

<script>

import { useI18n } from 'vue-i18n'
import { defineComponent, ref, getCurrentInstance } from "vue";
import globalMethods from '/src/utils'
import apiRequests from "src/api";
import { mainStore } from 'src/store/mainStore' 

export default defineComponent ({
setup(props, { emit }) {
    const { t } = useI18n()
    const yourname = ref('')
    const yourEmail = ref('')
    const yourreply = ref('')
    const instance = getCurrentInstance();
    const store = mainStore()

    const checkAll = () => {
        if (!store.canSendFeedback()) {
            globalMethods.showNotify(instance.proxy.$q, t('timeMailProblem'), 'negative', 'negative')
            return
        }
      
        if (yourname.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('emptyName'), 'negative', 'negative')
            return
        }
        if (checkEmail() == false) {
            return
        }
        if (yourreply.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('emptyText'), 'negative', 'negative')
            return
        }
        sendReply()
    }

    const checkEmail = () => {
        if (yourEmail.value.trim() == '') {
            globalMethods.showNotify(instance.proxy.$q, t('emptyEmail'), 'negative', 'negative')
            return false
        }
            
        if (globalMethods.checkEmail(yourEmail.value) == false) {
            globalMethods.showNotify(instance.proxy.$q, t('uncorrectEmail'), 'negative', 'negative')
            return false
        }
        return true
    }

    const sendReply = async () => {
        emit("isLoadingChanged", true)
                
        const result = await apiRequests.sendFeed(yourname.value, yourEmail.value, yourreply.value)       

        if (result.success) {
            emit("isLoadingChanged", false)          
            globalMethods.showNotify(instance.proxy.$q, t('sendMailSuccess'), 'primary', 'positive')          
            store.setLastFeedbackTime(new Date())
        } else {
            emit("isLoadingChanged", false) 
            // что-то пошло не так
            globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
            console.log(result.data)
        } 
    }

    return {
        t,
        yourname,
        yourEmail,
        yourreply,
        checkAll,
        sendReply
    }
}})

</script>

