const CONTACT_TYPES = {
    EMAIL: "EMAIL",
    PHONE: "PHONE"
}

const CONTACTS = {
    SUPPORT_PHONE: "+918779854190",
    SUPPORT_EMAIL: "contact@hwayz.com"
}

const handleContactClick = (value, type = CONTACT_TYPES.EMAIL) => () => {
    if (type === CONTACT_TYPES.EMAIL) {
        document.location.href = `mailto:${value}`
    }
    else {
        document.location.href = `tel:${value}`
    }
}

export {
    CONTACTS,
    CONTACT_TYPES,
    handleContactClick
}