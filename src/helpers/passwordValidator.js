export default function passwordValidator(password){
    if (!password) return `Пароль не может быть пустым`
    if (password.length < 5) return 'Пароль должен состоять не менее чем из 5 символов'
    return ''
}