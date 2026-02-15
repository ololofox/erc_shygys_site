<template>
  <q-page>
  
  <q-dialog v-model="dialogChangePassword">
      <q-card style="min-width: 300px; " class="q-elevation-4">

        <q-card-section>
          <div class="text-h6" style="margin-top:15px">{{t('changingPassword')}}</div>
        </q-card-section>

        <q-card-section >
          <q-input 
            v-model="passwordOld"
            :label="t('oldPassword')"            
            outlined
            :type="isPwdOld ? 'password' : 'text'"
          >
            <template v-slot:append>
                <q-icon
                    :name="isPwdOld ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdOld = !isPwdOld"
                ></q-icon>
            </template>
        </q-input>

          <q-input
            
            style="background-color: white; margin-top:10px"
            v-model="passwordNew"
            :label="t('newPassword')"            
            outlined
            :type="isPwdNew ? 'password' : 'text'"
          >
          <template v-slot:append>
                <q-icon
                    :name="isPwdNew ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdNew = !isPwdNew"
                ></q-icon>
            </template>
        </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Отмена" color="grey" @click="closeChangePassword" />
          <q-btn no-caps label="OK" color="primary" @click="checkAll"  />
        </q-card-actions>

      </q-card>
    </q-dialog>
  

    <q-dialog v-model="dialogChangeEmail">
      <q-card style="min-width: 300px;" class="q-elevation-4">

        <q-card-section>
          <div class="text-h6" style="margin-top:15px">{{t('changingEmail')}}</div>
        </q-card-section>

        <q-card-section >
          <q-input 
            v-model="passwordEmail"
            :label="t('yourPassword')"            
            outlined
            :type="isPwdEmail ? 'password' : 'text'"
          >
            <template v-slot:append>
                <q-icon
                    :name="isPwdEmail ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdEmail = !isPwdEmail"
                ></q-icon>
            </template>
        </q-input>

          <q-input
            
            style="background-color: white; margin-top:10px"
            v-model="newEmail"
            :label="t('newEmail')"            
            outlined
          >
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Отмена" color="grey" @click="closeChangeEmail" />
          <q-btn no-caps label="OK" color="primary" @click="checkAllEmail"  />
        </q-card-actions>

      </q-card>
    </q-dialog>




  <div h3>
        Личный кабинет
  </div>
  <div>
        <q-btn style="margin-top:10px" no-caps color="red" outline icon="logout" :label="t('exit')" @click="userExit()"></q-btn>
  </div>
  <div>
    <q-toggle
        v-model="isM"
        :label="t('notPaper')"
        color="primary"
        right-label

    />
    <q-btn style="margin-top:10px" no-caps color="blue" outline :label="t('save')" @click="saveIsMailing()"></q-btn>
  </div>
  <div>
        <q-btn style="margin-top:10px" no-caps color="green" outline icon="password" :label="t('changePassword')" @click="changePassword()"></q-btn>
  </div>
  <div>
        <q-btn style="margin-top:10px" no-caps color="purple" outline icon="mail" :label="t('changeEmail')" @click="changeEmail()"></q-btn>
  </div>
  </q-page>
</template>

<script>

import { useI18n } from 'vue-i18n'
import { defineComponent, onMounted, getCurrentInstance, ref } from "vue";
import { useRouter } from 'vue-router'
import cookies from "src/cookies";
//import globalMethods from '/src/utils'
import apiRequests from "src/api";
import globalMethods from 'src/utils';
//import { mainStore } from 'src/store/mainStore' 

export default defineComponent ({
setup(props, {emit}) {
    const { t } = useI18n()
    const instance = getCurrentInstance()
    const router = useRouter()
    const ls = cookies.getValue('ls')
    const isM = ref(false)
    const valIsM = ref(0)
    const dialogChangePassword = ref(false)
    const dialogChangeEmail = ref(false)
    const passwordOld = ref("")
    const passwordNew = ref("")
    
    const passwordEmail = ref("")
    const newEmail = ref("")
    const isPwdNew = ref(true)
    const isPwdOld = ref(true)
    const isPwdEmail = ref(true)
    const uid = cookies.getValue('user_id')
        

    //const store = mainStore()

    onMounted(async () => {
        emit("isLoadingChanged", true)
        emit("isInfoLoadingChanged", true)

       
        const result = await apiRequests.getInfo(ls)        

        if (result.success) {
          emit("isLoadingChanged", false)
          emit("isInfoLoadingChanged", false)
          // получили
          //globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'positive', 'positive')          
          if (result.data.IsMailing == 1) {
                isM.value = true
          } else {
                isM.value = false
          }
          console.log(result)
        } else {
          emit("isLoadingChanged", false)  
          emit("isInfoLoadingChanged", false)
          // что-то пошло не так
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')          
          router.push('/autor')
          console.log(result)
      }  
    })

    const userExit = () => {
        cookies.cleanCookies()
        router.push('/autor')      
    }

    const changePassword = () => {
        passwordNew.value = ""
        passwordOld.value = ""
        isPwdNew.value = true
        isPwdOld.value = true
        dialogChangePassword.value = true
    }


    const closeChangePassword = () => {
        dialogChangePassword.value = false
    }

    const closeChangeEmail = () => {
        dialogChangeEmail.value = false
    }

    const changeEmail = () => {
        passwordEmail.value = ""
        newEmail.value = ""
        isPwdEmail.value = false
        dialogChangeEmail.value = true
    }

    const checkAll = () => {
        if ((passwordOld.value.trim() == "") || (passwordNew.value.trim() == "")) {
            globalMethods.showNotify(instance.proxy.$q, t('printAll'), 'negative', 'negative')          
            return
        }

        if (passwordNew.value.length < 8) {
            globalMethods.showNotify(instance.proxy.$q, t('shortPassword'), 'negative', 'negative')          
            return
        }

        if (passwordOld.value.trim() == passwordNew.value.trim()) {
            globalMethods.showNotify(instance.proxy.$q, t('equalPasswords'), 'negative', 'negative')          
            return
        }

        sendPasswords()
    }

    const checkAllEmail = () => {
        if ((passwordEmail.value.trim() == "") || (newEmail.value.trim() == "")) {
            globalMethods.showNotify(instance.proxy.$q, t('printAll'), 'negative', 'negative')          
            return
        }

        if (passwordEmail.value.length < 8) {
            globalMethods.showNotify(instance.proxy.$q, t('shortPassword'), 'negative', 'negative')          
            return
        }

        if (globalMethods.checkEmail(newEmail.value) == false) {
            globalMethods.showNotify(instance.proxy.$q, t('uncorrectEmail'), 'negative', 'negative')
            return
        }

        sendEmailTo()
    }

    const sendPasswords = async () => {
        emit("isLoadingChanged", true)
                
        const result = await apiRequests.changePassword(uid, passwordOld.value, passwordNew.value)       

        if (result.success) {
            emit("isLoadingChanged", false)          
            globalMethods.showNotify(instance.proxy.$q, t('changePasswordSuccess'), 'primary', 'positive')          
            closeChangePassword()
        } else {
            emit("isLoadingChanged", false) 
            // что-то пошло не так
            globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
            console.log(result.data)
        } 
    }

    const sendEmailTo = async () => {
        emit("isLoadingChanged", true)
                
        const result = await apiRequests.changeEmail(uid, passwordEmail.value, newEmail.value)       

        if (result.success) {
            emit("isLoadingChanged", false)          
            globalMethods.showNotify(instance.proxy.$q, t('changeEmailSuccess'), 'primary', 'positive')          
            closeChangeEmail()
        } else {
            emit("isLoadingChanged", false) 
            // что-то пошло не так
            globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
            console.log(result.data)
        } 
    }

    const saveIsMailing = async () => {
        emit("isLoadingChanged", true)
        
        if (isM.value) {
            valIsM.value = 1
        } else {
            valIsM.value = 0
        }
        const uid = cookies.getValue('user_id')
        const result = await apiRequests.isMailing(uid, valIsM.value)       

        if (result.success) {
          emit("isLoadingChanged", false)          
          globalMethods.showNotify(instance.proxy.$q, t('messageStatusEmail'), 'primary', 'positive')          
        } else {
          emit("isLoadingChanged", false)  
          // что-то пошло не так
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')

      } 
    }

    return {
        t,        
        userExit,
        saveIsMailing,
        isM,
        changePassword,        
        dialogChangePassword,
        dialogChangeEmail,
        closeChangePassword,
        closeChangeEmail,
        passwordNew,
        passwordOld,
        checkAll,
        checkAllEmail,
        isPwdNew: ref(true),
        isPwdOld: ref(true),
        isPwdEmail: ref(true),
        passwordEmail,
        newEmail,
        changeEmail,
        sendEmailTo
    }
}})

</script>

<style>

</style>