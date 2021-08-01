export const setUser = (uid) => {
    return { type: 'UID',data:uid }
}

export const navigation = (page) => {
    return { type:'NAVIGATE',data:page }
}

export const tabNavigation = (tab) => {
    return { type:'TAB',data:tab }
}