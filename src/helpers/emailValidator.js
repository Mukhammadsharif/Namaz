export default function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Электронная почта не может быть пустой"
    if (!re.test(email)) return 'Ой! Нам нужен действующий адрес электронной почты'
    return ''
}