export default function toJSDate(dateTime) {
    const input = dateTime.split(' ')
    const date = input[0].split('-')
    const newDate = `${date[2]}.${date[1]}.${date[0]}`
    return newDate
}
