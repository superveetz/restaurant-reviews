export interface PaginationControlsState {
    selectedItemsPerPage: number
    selectedPageNum: number
}

export const SET_PAGE_NUM = 'SET_PAGE_NUM'
export const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE'

export const defaultPaginationOptions = [5, 10, 25]
export const defaultPaginationControlsState = {
    selectedItemsPerPage: defaultPaginationOptions[0],
    selectedPageNum: 1,
}

const PaginationControlsReducer = (
    state: PaginationControlsState = defaultPaginationControlsState,
    action: { type: string; payload: any }
) => {
    const { selectedPageNum, selectedItemsPerPage } = state
    const { type, payload } = action

    switch (type) {
        case SET_PAGE_NUM:
            return {
                ...state,
                selectedPageNum: payload,
            }

        case SET_ITEMS_PER_PAGE:
            // recalculate the selected page now
            // calc previously skipped items
            const prevSkipped = (selectedPageNum - 1) * selectedItemsPerPage
            // calc new page to skip same amount
            const newPage = Math.floor(prevSkipped / payload) + 1

            return {
                ...state,
                selectedItemsPerPage: payload,
                selectedPageNum: newPage,
            }
        default:
            return { ...state }
    }
}

export default PaginationControlsReducer
