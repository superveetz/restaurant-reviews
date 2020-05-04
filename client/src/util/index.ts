export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const arrayOfObjToRows = (arrayOfObj: object[]) => {
    return arrayOfObj.map((object: any) => {
        return Object.keys(object).map((keyName: string) => {
            return object[keyName]
        })
    })
}

export const scrollToTop = () => {
    const rootElem = document.querySelector('#root')
    if (rootElem) {
        rootElem.scrollTop = 0
    }
}
