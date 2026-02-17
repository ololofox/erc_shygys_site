<template>
  <q-page class="cabinet-page q-pa-md">

    <!-- Диалоги -->
    <q-dialog v-model="dialogChangePassword">
      <q-card style="min-width: 320px;" class="q-elevation-6">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('changingPassword') }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="passwordOld" :label="t('oldPassword')" outlined :type="isPwdOld ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon :name="isPwdOld ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdOld = !isPwdOld"/>
            </template>
          </q-input>
          <q-input v-model="passwordNew" :label="t('newPassword')" outlined :type="isPwdNew ? 'password' : 'text'" class="q-mt-md">
            <template v-slot:append>
              <q-icon :name="isPwdNew ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdNew = !isPwdNew"/>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="grey" :label="t('cancel')" @click="closeChangePassword"/>
          <q-btn color="primary" :label="t('ok')" @click="checkAll"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogChangeEmail">
      <q-card style="min-width: 320px;" class="q-elevation-6">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('changingEmail') }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="passwordEmail" :label="t('yourPassword')" outlined :type="isPwdEmail ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon :name="isPwdEmail ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdEmail = !isPwdEmail"/>
            </template>
          </q-input>
          <q-input v-model="newEmail" :label="t('newEmail')" outlined class="q-mt-md"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="grey" :label="t('cancel')" @click="closeChangeEmail"/>
          <q-btn color="primary" :label="t('ok')" @click="checkAllEmail"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Заголовок -->
    <div class="row items-center justify-between q-mb-lg">
      <div style="font-size:30px;font-weight: 500;margin-top:25px">
        <q-icon 
          name="person" 
          size="24px" 
          color="primary" 
        />
        {{t('personalAccount')}}</div>
      <q-btn flat  color="negative" icon="logout" :label="t('exit')" @click="userExit"/>
    </div>

    <!-- Настройки -->
    <q-card class="settings-card shadow-2 q-mb-xl">
      
      <q-card-section style="font-size:20px">
        
        {{t('settings') }}</q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <q-toggle v-model="isM" :label="t('notPaper')" color="primary"/>
          <q-btn no-caps outline color="primary" :label="t('save')" @click="saveIsMailing"/>
        </div>
        <q-separator/>
        <div class="row q-gutter-md" style="margin-top:10px;display: flex;justify-content: center;">
          <q-btn no-caps outline color="red" :label="t('changePassword')"  @click="changePassword"/>
          <q-btn no-caps outline color="red" :label="t('changeEmail')" @click="changeEmail"/>
        </div>
      </q-card-section>
    </q-card>

    <!-- Лицевые счета -->
    <div v-if="consumerInfo?.Accounts?.length">
      <q-card class="accounts-card shadow-2">
        <q-card-section style="font-size:20px">{{ t('infoLS') }}</q-card-section>
        <q-separator/>
        <q-card-section>
          <q-expansion-item
            v-for="account in consumerInfo.Accounts"
            :key="account.AccountID"            
            header-class="account-header"
            expand-icon-class="text-primary"  
            group="somegroup"
            >
          <q-separator/>
          <template v-slot:header>
                  <q-item-section avatar>
                      <q-icon name="numbers" />
                  </q-item-section>   
                  <q-item-section style="font-size:large;">
                      {{ t('ls') }} № {{account.AccountID}}
                  </q-item-section>
          </template>
          
          
          <div v-for="consumer in account.Consumers" :key="consumer.AccountID" style="margin-left:30px">
              <q-expansion-item icon="perm_identity">
                <template v-slot:header>
                  <q-item-section avatar>
                      <q-icon name="info" />
                  </q-item-section>   
                  <q-item-section style="font-size:medium;" bordered>
                          {{t('infoProvider')}}
                  </q-item-section>
                  </template>
              <!-- Поставщики -->
              <div
                v-for="org in consumer.AccountsOrg"
                :key="org.ID"
                :label="org.Provider"
                header-class="org-header"
                expand-icon-class="text-secondary"
                class="org-card q-mb-md"
              >
                <div class="org-info q-pa-sm">
                    <div style="font-size:15px;margin-bottom:10px">{{ org.Provider }}</div>
                    <div>{{ t('lsOfProvider')}} <b>{{ org.ID }}</b></div>
                    <div>{{ t('square') }} : {{ org.Square }}</div>
                    <div>{{ t('countPeople')}}: {{ org.CountPeople }}</div>
                </div>
                </div>
              
              </q-expansion-item>
                <!-- Начисления каждого поставщика -->
                <div v-if="consumer.billing?.Calcs?.length">
                  <q-expansion-item
                    v-for="calc in consumer.billing.Calcs"
                    :key="calc.CalcMonth"                    
                    expand-separator
                    class="billing-expansion"                    
                  >
                  <template v-slot:header>
                     <q-item-section avatar>
                          <q-icon name="calculate" />
                     </q-item-section>   
                     <q-item-section style="font-size:medium;">
                          {{t('curMonthNach')}}
                     </q-item-section>
                  </template>
                    <div v-for="provider in calc.Providers" :key="provider.ProviderName" class="provider-card q-pa-md q-mb-md">
                      
                        {{ provider.ProviderName }}
                      <q-markup-table dense flat bordered class="billing-table">
                        <thead>
                          <tr>
                            <th>{{ t('usluga')}}</th>
                            <th>{{ t('saldoNach')}}</th>
                            <th>{{ t('oplata')}}</th>
                            <th>{{ t('prevPoks')}}</th>
                            <th>{{ t('curPoks')}}</th>
                            <th>{{ t('count')}}</th>
                            <th>{{ t('cost')}}</th>
                            <th>{{ t('nach')}}</th>
                            <th>{{ t('penya')}}</th>
                            <th>{{ t('pereraschet')}}</th>
                            <th>{{ t('toOplata')}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="row in provider.Rows" :key="row.ServiceName">
                            <td>{{ row.ServiceName }}</td>
                            <td>{{ row.SumSaldoBegin }}</td>
                            <td>{{ row.SumPay }}</td>
                            <td>
                              <div v-for="(pok, idx) in row.PokRow" :key="idx">{{ pok.PayCount }}</div>
                            </td>
                            <td>
                              <div v-for="(pok, idx) in row.PokRow" :key="idx">{{ pok.CheckCount }}</div>
                            </td>
                            <td>
                              <div v-for="(pok, idx) in row.PokRow" :key="idx">{{ pok.Consumption }}</div>
                            </td>
                            <td>
                              <div v-for="(pok, idx) in row.PokRow" :key="idx">{{ pok.Tariff }}</div>
                            </td>
                            <td>{{ row.SumCalc }}</td>
                            <td>{{ row.SumPen }}</td>
                            <td>{{ row.SumRecalc }}</td>
                            <td>{{ row.SumSaldoEnd }}</td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                    </div>
                    <div class="row q-mb-sm">
                        <div class="col" style="margin-left:15px;color:blue;display: flex;justify-content: right;">
                          <q-btn outline no-caps :label="t('pdfDownload')"/>
                        </div>
                    </div>
                  </q-expansion-item>
                </div>

            </div>
            
          </q-expansion-item>
        </q-card-section>
      </q-card>
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
    const consumerInfo = ref(null)

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
          consumerInfo.value = result.data
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
        sendEmailTo,
        consumerInfo
    }
}})

</script>

<style scoped>
.cabinet-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Настройки */
.settings-card {
  border-radius: 12px;
  transition: all 0.3s;
}
.settings-card:hover {
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* Аккордеон лицевых счетов */
.account-header {
  font-weight: 600;
  font-size: 16px;
}
.account-item {
  margin-bottom: 12px;
}

/* Поставщики */
.org-card {
  background: linear-gradient(90deg, #f0f4ff, #e6ebff);
  border-radius: 10px;
  transition: all 0.3s;
  margin-left:40px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  margin-top: 10px;
}
.org-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.5);
}
.org-header {
  font-weight: 500;
  font-size: 15px;
}
.org-info div {
  margin-bottom: 4px;
}

/* Начисления */

.provider-card {
  border-radius: 8px;
  transition: all 0.3s;
  margin-left: 40px;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.provider-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.billing-table th {
  background-color: #e0e7ff;
  text-align: center;
  font-weight: 600;
}
.billing-table td {
  text-align: center;
}

/* Красная подсветка задолженности */
.overdue {
  background-color: #ffe0e0;
}

/* Диалоги */
.dialog-card {
  border-radius: 12px;
}
</style>