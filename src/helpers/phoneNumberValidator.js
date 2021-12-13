export default function phoneNumberValidator(phoneNumber){
    if (!phoneNumber) return `Номер телефона не может быть пустым`
    if (phoneNumber.length < 12) return 'Номер телефона должен состоять не менее чем из 13 символов.'
    return ''
}