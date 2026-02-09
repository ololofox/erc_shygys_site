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
    }
}

export default globalMethods;