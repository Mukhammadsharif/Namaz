import firebase from '../../config'

export const SendMessage = async (currentUid, guestUid, message, id) => {
    try {
        return await firebase
            .database()
            .ref('messages')
            .child(currentUid)
            .child(guestUid)
            .push({
                currentUid: currentUid,
                guestUid: guestUid,
                message: message,
                created_at: new Date().toLocaleTimeString(),
                id: id,
            });
    } catch (error) {
        return error
    }
}

export const ReceiveMessage = async (currentUid, guestUid, message) => {
    try {
        return await firebase
            .database()
            .ref('messages')
            .child(guestUid)
            .child(currentUid)
            .push({
                currentUid: currentUid,
                guestUid: guestUid,
                message: message,
            });
    } catch (error) {
        return error
    }
}