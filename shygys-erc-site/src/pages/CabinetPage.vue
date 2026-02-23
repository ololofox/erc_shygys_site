<template>
  <q-page class="cabinet-page q-pa-md" >

    <!-- Диалоги -->
    <q-dialog v-model="dialogChangePassword">
      <q-card style="min-width: 320px;" class="q-elevation-6">
        <q-card-section>
          <div style="margin-top:15px;color: #123046;font-weight: 600;font-size: clamp(20px, 2.5vw, 28px);">{{ t('changingPassword') }}</div>
        </q-card-section>
      <q-separator />
        <q-card-section>
          <q-input dense v-model="passwordOld" :label="t('oldPassword')" outlined :type="isPwdOld ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon :name="isPwdOld ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdOld = !isPwdOld"/>
            </template>
          </q-input>
          <q-input dense v-model="passwordNew" :label="t('newPassword')" outlined :type="isPwdNew ? 'password' : 'text'" class="q-mt-md">
            <template v-slot:append>
              <q-icon :name="isPwdNew ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdNew = !isPwdNew"/>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <div class="button-actions">
            <q-btn color="grey" :label="t('cancel')" @click="closeChangePassword"/>
            <q-btn style="margin-left: 5px;" color="primary" :label="t('ok')" @click="checkAll"/>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogChangeEmail">
      <q-card style="min-width: 320px;" class="q-elevation-6">
        <q-card-section>
          <div style="font-size:20px;margin-top:15px;color: #123046;font-weight: 600;font-size: clamp(20px, 2.5vw, 28px);">{{ t('changingEmail') }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input dense v-model="passwordEmail" :label="t('yourPassword')" outlined :type="isPwdEmail ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon :name="isPwdEmail ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwdEmail = !isPwdEmail"/>
            </template>
          </q-input>
          <q-input dense v-model="newEmail" :label="t('newEmail')" outlined class="q-mt-md"/>
        </q-card-section>
        <q-card-actions align="right" class="button-actions">
          <q-btn color="grey" :label="t('cancel')" @click="closeChangeEmail"/>
          <q-btn color="primary" :label="t('ok')" @click="checkAllEmail"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Заголовок -->
    <div class="row items-center justify-between q-mb-lg">
      <div style="font-size: clamp(20px, 2.5vw, 28px);font-weight: 600;margin-top:25px;gap: 16px;color: #123046;">
        <q-icon 
          name="person" 
          size="24px" 
          color="primary" 
        />
        {{t('personalAccount')}}</div>
      <q-btn flat  color="negative" icon="logout" :label="t('exit')" @click="userExit"/>
    </div>

<div v-if="hasInfo === 1">

    <!-- Лицевые счета -->
    <div v-if="consumerInfo?.Accounts?.length">
      <q-card class="accounts-card shadow-2">

        <q-card-section style="font-size:clamp(16px, 2vw, 20px);font-weight: 600;margin-top:25px;gap: 16px;color: #123046;">
          {{ t('infoLS') }}
        </q-card-section>

        <q-separator />

        <q-card-section>

          <!-- ===== Лицевой счет ===== -->
          <q-expansion-item
            v-for="account in consumerInfo.Accounts"
            :key="account.AccountID"
            header-class="account-header"
            expand-icon-class="text-primary"
            group="accounts"
          >
            <!-- Header счета -->
            <template #header>
              <q-item-section avatar style="color:royalblue">
                <q-icon name="numbers" />
              </q-item-section>

              <q-item-section style="font-size:clamp(14px, 1.8vw, 16px);font-weight: 500;gap: 16px;color: #123046;">
                {{ t('ls') }} № {{ account.AccountID }}
              </q-item-section>

      
            </template>

            <div style="display: flex;justify-content: right; margin-top:10px;margin-bottom:10px;font-size:15px;margin-right: 20px;color: #123046;">
                {{ account.Address }}
            </div>
            <q-separator />

            <!-- ===== Поставщики ===== -->
            <q-expansion-item icon="perm_identity" style="margin-left:30px">

              <template #header>
                <q-item-section avatar style="color:lightslategrey">
                  <q-icon name="info_outline" />
                </q-item-section>

                <q-item-section style="font-size:clamp(14px, 1.8vw, 16px);gap: 16px;color: #123046;">
                  {{ t('infoProvider') }}
                </q-item-section>
              </template>

              <div v-if="account.AccountsOrg!=null" style="margin-right:20px;color: #123046;">

                <div
                  v-for="org in account.AccountsOrg || []"
                  :key="org.ID"
                  class="org-card q-mb-md q-pa-sm"
                >
                  <div style="font-size:15px;margin-bottom:10px">
                    {{ org.Provider }}
                  </div>

                  <div>
                    {{ t('lsOfProvider') }} <b>{{ org.ID }}</b>
                  </div>

                  <div>
                    {{ t('square') }} : {{ org.Square }}
                  </div>

                  <div>
                    {{ t('countPeople') }} : {{ org.CountPeople }}
                  </div>
                </div>

              </div>

              <div v-else class="column items-center text-grey-5" style="color: #123046;">
                <div style="margin:10px 0">
                  <q-icon name="info" size="30px" class="q-mb-sm" />
                  {{ t('noInfoAboutProviders') }}
                </div>
              </div>

            </q-expansion-item>


            <!-- ===== Начисления ===== -->
            <q-expansion-item style="margin-left:30px"> 

              <template #header>
                <q-item-section avatar style="color:lightslategrey">
                  <q-icon name="article" />
                </q-item-section>

                <q-item-section style="font-size:clamp(14px, 1.8vw, 16px);gap: 16px;color: #123046;">
                  {{ t('curMonthNach') }}
                </q-item-section>
              </template>

              <div v-if="account.billing.Calcs[0].Providers!=null" style="color: #123046;" >
                 
                <div
                  v-for="calc in account.billing.Calcs || []"
                  :key="calc.CalcMonth"
                  class="billing-expansion" style="margin-right:20px;"
                >

                  <div
                    v-for="provider in calc.Providers || []"
                    :key="provider.ProviderName"
                    class="provider-card q-pa-md q-mb-md"
                  >
                    <div class="q-mb-sm">
                      <strong>{{ provider.ProviderName }}</strong>
                    </div>
                    
                    <q-markup-table dense flat bordered class="billing-table" v-if="$q.screen.gt.sm">
                      <thead>
                        <tr>
                          <th>{{ t('usluga') }}</th>
                          <th>{{ t('saldoNach') }}</th>
                          <th>{{ t('oplata') }}</th>
                          <th>{{ t('prevPoks') }}</th>
                          <th>{{ t('curPoks') }}</th>
                          <th>{{ t('count') }}</th>
                          <th>{{ t('cost') }}</th>
                          <th>{{ t('nach') }}</th>
                          <th>{{ t('penya') }}</th>
                          <th>{{ t('pereraschet') }}</th>
                          <th>{{ t('toOplata') }}</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="row in provider.Rows"
                          :key="row.ServiceName"
                        >
                          <td>{{ row.ServiceName }}</td>
                          <td>{{ row.SumSaldoBegin }}</td>
                          <td>{{ row.SumPay }}</td>

                          <td>
                            <div
                              v-for="(pok, idx) in row.PokRow"
                              :key="'pay'+idx"
                            >
                              {{ pok.PayCount }}
                            </div>
                          </td>

                          <td>
                            <div
                              v-for="(pok, idx) in row.PokRow"
                              :key="'check'+idx"
                            >
                              {{ pok.CheckCount }}
                            </div>
                          </td>

                          <td>
                            <div
                              v-for="(pok, idx) in row.PokRow"
                              :key="'cons'+idx"
                            >
                              {{ pok.Consumption }}
                            </div>
                          </td>

                          <td>
                            <div
                              v-for="(pok, idx) in row.PokRow"
                              :key="'tariff'+idx"
                            >
                              {{ pok.Tariff }}
                            </div>
                          </td>

                          <td>{{ row.SumCalc }}</td>
                          <td>{{ row.SumPen }}</td>
                          <td>{{ row.SumRecalc }}</td>
                          <td>{{ row.SumSaldoEnd }}</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                    



<div v-else class="billing-cards"  >
      <div
        v-for="row in provider.Rows"
        :key="row.ServiceName"
        class="billing-card" 
      >
        <div class="card-field"><strong>{{ t('usluga') }}:</strong> {{ row.ServiceName }}</div>
        <div class="card-field"><strong>{{ t('saldoNach') }}:</strong> {{ row.SumSaldoBegin }}</div>
        <div class="card-field"><strong>{{ t('oplata') }}:</strong> {{ row.SumPay }}</div>

        <div class="card-field">
          <strong>{{ t('prevPoks') }}:</strong>
          <div v-for="(pok, idx) in row.PokRow" :key="'pay'+idx">{{ pok.PayCount }}</div>
        </div>

        <div class="card-field">
          <strong>{{ t('curPoks') }}:</strong>
          <div v-for="(pok, idx) in row.PokRow" :key="'check'+idx">{{ pok.CheckCount }}</div>
        </div>

        <div class="card-field">
          <strong>{{ t('count') }}:</strong>
          <div v-for="(pok, idx) in row.PokRow" :key="'cons'+idx">{{ pok.Consumption }}</div>
        </div>

        <div class="card-field">
          <strong>{{ t('cost') }}:</strong>
          <div v-for="(pok, idx) in row.PokRow" :key="'tariff'+idx">{{ pok.Tariff }}</div>
        </div>

        <div class="card-field"><strong>{{ t('nach') }}:</strong> {{ row.SumCalc }}</div>
        <div class="card-field"><strong>{{ t('penya') }}:</strong> {{ row.SumPen }}</div>
        <div class="card-field"><strong>{{ t('pereraschet') }}:</strong> {{ row.SumRecalc }}</div>
        <div class="card-field"><strong>{{ t('toOplata') }}:</strong> {{ row.SumSaldoEnd }}</div>
      </div>
    </div>
                    

                  </div>

                </div>

              </div>

              <div v-else class="column items-center text-grey-5">
                <div style="margin:10px 0">
                  <q-icon name="info" size="30px" class="q-mb-sm" />
                  {{ t('noInfoAboutNach') }}
                </div>
              </div>

            </q-expansion-item>


          <div class="row q-mb-sm button-actions">
            <div
              class="col"
              style="margin-top:15px; margin-left:15px;color:blue;display:flex;justify-content:right;"
            >
            <div style="margin-right:10px;color: #123046;">
                <q-input v-model="selectedMonth" type="month" :label="t('monthCreate')" outlined dense />
            </div>

            <q-btn
                color="primary"
                no-caps
                :label="t('pdfDownload')"
                @click="downloadPDF(account.AccountID)"
                style="margin-right:20px"
              />
            </div>
          </div>

          </q-expansion-item>


          

        </q-card-section>
      </q-card>
    </div>

    <!-- Если счетов нет -->
    <div v-else class="column items-center text-grey-5">
      <q-icon name="info" size="30px" class="q-mb-sm" />
      {{ t('noData') }}
    </div>

  

    


    <!-- Настройки -->
    <q-card class="settings-card shadow-2 q-mb-xl" style = "margin-top:20px">
      
      <q-card-section style="font-size:clamp(16px, 2vw, 20px);font-weight: 600;margin-top:25px;gap: 16px;color: #123046;">
        
        {{t('settings') }}</q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="row items-center justify-between q-mb-md" style="color: #123046;" >
          <div>
              <q-toggle v-model="isM" :label="t('notPaper')" color="primary"/>
          </div>
          <div class="button-actions">
              <q-btn no-caps color="primary" :label="t('save')" @click="saveIsMailing"/>
          </div>
        </div>
        <q-separator/>
        <div class="row q-gutter-md button-actions" style="margin-top:10px;display: flex;justify-content: center;">
          <q-btn no-caps color="red" :label="t('changePassword')"  @click="changePassword"/>
          <q-btn no-caps color="red" :label="t('changeEmail')" @click="changeEmail"/>
        </div>
      </q-card-section>
    </q-card>


    </div>
    <div v-else style="font-size:15px;margin-left:50px">
        <q-icon name="info" size="20px" style="color:grey" /> {{t('noData')}}
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
    const hasInfo = ref(0)
    const selectedMonth = ref(null)
    const curCalcMonth = ref("")


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
          //if (result.data.IsMailing == 1) {
          isM.value = result.data.IsMailing
          //} else {
          //      isM.value = false
          //}          
          consumerInfo.value = result.data
          hasInfo.value = 1

          curCalcMonth.value = result.data.CalcMonth
          selectedMonth.value = curCalcMonth.value.substring(0, curCalcMonth.value.length - 3) 
        } else {
          emit("isLoadingChanged", false)  
          emit("isInfoLoadingChanged", false)
          // что-то пошло не так
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')          
          //router.push('/autor')
          hasInfo.value = 0
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
        const result = await apiRequests.isMailing(uid, isM.value)       

        if (result.success) {
          emit("isLoadingChanged", false)          
          globalMethods.showNotify(instance.proxy.$q, t('messageStatusEmail'), 'primary', 'positive')          
        } else {
          emit("isLoadingChanged", false)  
          // что-то пошло не так
          globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
          console.log(result.data)
      } 
    }

    const downloadPDF = async (_accountID) => {
      const selectedMonthCh = selectedMonth.value + '-01'
      

      if (isDateFormat(selectedMonthCh)) {
          emit("isLoadingChanged", true)  
          
          const result = await apiRequests.createBill(_accountID, 0, selectedMonthCh)
          
          if (result.success) {
              emit("isLoadingChanged", false)          
              globalMethods.showNotify(instance.proxy.$q, t('successDownloadPDF'), 'primary', 'positive')          
          } else {
              emit("isLoadingChanged", false)  
              // что-то пошло не так
              globalMethods.showNotify(instance.proxy.$q, t(result.data.messagelocale), 'negative', 'negative')
          } 
      } else {
          globalMethods.showNotify(instance.proxy.$q, t('notCorrectDate'), 'negative', 'negative')
      }
                    
      
    }

    const isDateFormat = (str) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(str)
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
        consumerInfo,
        hasInfo,
        selectedMonth,
        downloadPDF,
        curCalcMonth
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
  background-color: #f3f3ff;
  text-align: center;
  font-weight: 600;
  color: #123046;
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

.billing-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.billing-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
background-color: #f3f3ff;
}

.card-field {
  padding: 2px 0;
  word-break: break-word;
}


</style>