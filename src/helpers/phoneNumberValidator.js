export default function phoneNumberValidator(phoneNumber){
    if (!phoneNumber) return `Phone number can't be empty`
    if (phoneNumber.length < 12) return 'Phone number must be at least 13 characters long'
    return ''
}