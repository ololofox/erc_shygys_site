const globalMethods = {
    // всплывающее уведомление
    // передаем текст, цвет и тип сообщения
    showNotify($q, mes, typColor, typMes) {
        $q.notify({
            message: mes,
            color: typColor, 
            type: typMes,
            position: 'bottom',
            timeout: 5000
          })
    },
    checkEmail(namEmail) {
        const atIndex = namEmail.indexOf('@')
        const dotIndex = namEmail.lastIndexOf('.') 
        if (!(namEmail.includes('@')) || !(namEmail.includes('.')) || (atIndex <= 0) || (dotIndex <= atIndex + 1) || (dotIndex === namEmail.length - 1)) {                    
            return false
        } else {
            return true
        }
    }
}

export default globalMethods;