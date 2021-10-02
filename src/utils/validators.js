import { integersOnly } from './number'

/* eslint-disable consistent-return */
export function phone(value) {
    const integers = integersOnly(value)

    if (integers.length !== 9) {
        return 'validateOfPhone'
    }
}

/* eslint-disable consistent-return */
export function required(value) {
    if (value === '' || value === null || value === undefined || value.length === 0) {
        return 'required'
    }
}

/* eslint-disable consistent-return */
export function validator(...validators) {
    return (value) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const fn of validators) {
            const message = fn(value)
            if (message) return message
        }
    }
}

export function oilYear(value) {
    const today = new Date()

    if (today.getFullYear() - 10 >= value || today.getFullYear() + 10 <= value) {
        return 'validateOfDate'
    }
}

export function minLengthNumber(value) {
    if (value.length < 13) {
        return 'validateOfNumber'
    }
}
