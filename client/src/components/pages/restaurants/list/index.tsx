import React from 'react'
import { css } from '@emotion/core'
import moment from 'moment'

// src
import * as styleVars from 'const/styles'
import Button from 'components/ui/button'
import DataTable, { TableHeaders } from 'components/ui/data-table'

import mockData from 'dev/mock-data'
console.log('mockData: ', mockData)

interface RestaurantListViewProps {}

const tableHeaders: TableHeaders[] = [
    {
        text: 'View Details',
        tableDataKeyName: 'id',
        cellCss: css`
            width: 200px;
        `,
        dataCellCss: css`
            &.pq-table-cell {
                font-family: Poppins;
                font-size: 14px;
                font-weight: bold;
                line-height: 1.43;
                color: ${styleVars.darkBlack};
            }
        `,
    },
    {
        text: 'Name',
        tableDataKeyName: 'name',
        cellCss: css`
            width: 88px;
        `,
        dataCellCss: css`
            &.pq-table-cell {
                font-family: Poppins;
                font-size: 13px;
                font-weight: 600;
                line-height: 1.54;
            }
        `,
        condtionalDataCellCss: [
            {
                rule: (value: any) => value === 'R',
                cellCss: css`
                    &.pq-table-cell {
                        color: ${styleVars.primaryBlue} !important;
                        & .pq-data-point {
                            text-align: center;
                            height: 24px;
                            width: 24px;
                            line-height: 24px;
                            display: inline-block;
                            border-radius: 4px;
                            background-color: ${styleVars.primaryBlue};
                        }
                    }
                `,
            },
            {
                rule: (value: any) => value === 'C',
                cellCss: css`
                    &.pq-table-cell {
                        color: ${styleVars.primaryBlue} !important;
                        & .pq-data-point {
                            text-align: center;
                            height: 24px;
                            width: 24px;
                            line-height: 24px;
                            display: inline-block;
                            border-radius: 4px;
                            background-color: ${styleVars.primaryBlue};
                        }
                    }
                `,
            },
        ],
    },
    {
        text: 'Avg Rating',
        tableDataKeyName: 'avgRating',
        cellCss: css`
            width: 130px;
        `,
        dataCellCss: css`
            &.pq-table-cell {
                font-family: Poppins;
                font-size: 13px;
                line-height: 1.54;
                color: ${styleVars.darkBlack};
            }
        `,
    },
    // {
    //     text: 'Questions',
    //     tableDataKeyName: 'questions',
    //     cellCss: css`
    //         width: 120px;
    //     `,
    //     dataCellCss: css`
    //         &.pq-table-cell {
    //             font-family: Poppins;
    //             font-size: 13px;
    //             line-height: 1.54;
    //             color: ${styleVars.darkBlack};
    //         }
    //     `,
    // },
    // {
    //     text: 'Status',
    //     tableDataKeyName: 'status',
    //     cellCss: css`
    //         width: 100px;
    //     `,
    //     dataCellCss: css`
    //         &.pq-table-cell {
    //             font-family: Poppins;
    //             font-size: 13px;
    //             font-weight: 600;
    //             line-height: 1.62;
    //             color: #3f6db4;
    //         }
    //     `,
    //     condtionalDataCellCss: [
    //         {
    //             rule: (value: any) => value === 'Draft',
    //             cellCss: css`
    //                 &.pq-table-cell {
    //                     color: ${styleVars.primaryBlue} !important;
    //                     & .pq-data-point {
    //                         text-align: center;
    //                         width: 48px;
    //                         height: 24px;
    //                         line-height: 24px;
    //                         display: inline-block;
    //                         border-radius: 4px;
    //                         background-color: ${styleVars.primaryBlue};
    //                     }
    //                 }
    //             `,
    //         },
    //         {
    //             rule: (value: any) => value === 'Completed',
    //             cellCss: css`
    //                 &.pq-table-cell {
    //                     color: ${styleVars.primaryBlue} !important;
    //                     & .pq-data-point {
    //                         text-align: center;
    //                         width: 84px;
    //                         height: 21px;
    //                         line-height: 24px;
    //                         display: inline-block;
    //                         border-radius: 4px;
    //                         background-color: ${styleVars.primaryBlue};
    //                     }
    //                 }
    //             `,
    //         },
    //     ],
    // },
    // {
    //     text: 'Last Time Used',
    //     tableDataKeyName: 'lastUsed',
    //     cellCss: css`
    //         width: 150px;
    //     `,
    //     dataCellCss: css`
    //         &.pq-table-cell {
    //             font-family: Poppins;
    //             font-size: 13px;
    //             line-height: 1.54;
    //             color: ${styleVars.darkBlack};
    //         }
    //     `,
    // },
]

// maybe this menu should be part of the table data so that `this` can be used
// so we can use the item data for the currently open menu
// const tableActionMenu: TableAction[] = [
//     {
//         icon: SvgEdit,
//         text: 'Edit',
//         onClick: () => console.log('clicked edit'),
//     },
//     {
//         icon: SvgDelete,
//         text: 'Delete',
//         onClick: () => console.log('clicked delete'),
//     },
// ]

const RestaurantListView: React.FC<RestaurantListViewProps> = (props) => {
    return <div className="RestaurantListView">Restaurant list</div>
}

export default RestaurantListView
