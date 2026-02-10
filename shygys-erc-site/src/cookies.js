import VueCookies from 'vue-cookies'

const cookies = {
    setValue(namVal, val) {
        // устанавливаем значение переданного параметра
        VueCookies.set(namVal, val, '100y')
    },
    getValue(namVal) {
        // вытягиваем значения по имени параметра
        return VueCookies.get(namVal)
    }
}

export default cookies;
