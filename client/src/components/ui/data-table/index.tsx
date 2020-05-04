/** @jsx jsx */
import React from "react";
import styled, { StyledComponent } from "@emotion/styled";
import { jsx, css, InterpolationWithTheme } from "@emotion/core";
import { Table } from "react-bootstrap";
import {
  FormControl,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";

// src
import * as styleVars from "const/styles";
import Button from "components/ui/button";
import PaginationControls from "components/ui/pagination-controls";
import PaginationControlsReducer, {
  defaultPaginationControlsState,
  defaultPaginationOptions,
  SET_ITEMS_PER_PAGE,
  SET_PAGE_NUM,
} from "components/ui/pagination-controls/reducer";

const DataTableWrapper = styled.div`
  & .data-table-wrapper {
    overflow-x: auto;
  }

  table {
    padding-bottom: 20px;
  }

  & th {
    user-select: none;
  }

  & td.no-surveys-msg {
    width: 100%;
    font-family: Poppins;
    font-size: 14px !important;
    font-weight: bold !important;
    line-height: 1.29;
    color: ${styleVars.darkBlack} !important;
    text-align: center;
  }

  & .ascending-caret {
    transform: rotateX(180deg);
  }

  & .active-caret {
    & path:last-child {
      fill: ${styleVars.primaryBlue};
    }
  }

  & .active-header {
    color: ${styleVars.primaryBlue};
  }
`;
enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type TableAction = {
  icon?: JSX.Element;
  text: string;
  onClick: (dataCell: any) => void;
};

type ConditionalCellCss = {
  rule: (value: any) => boolean;
  cellCss: InterpolationWithTheme<any>;
};

export enum FilterInputTypes {
  DROPDOWN = "DROPDOWN",
}

type SelectOption = {
  value: any;
  label: string;
};

export enum FilterInputOptionsValue {
  UNIQUE = "UNIQUE",
  CUSTOM = "CUSTOM",
}

export type DropdownFilterType = {
  type: FilterInputTypes.DROPDOWN;
  options: {
    values: FilterInputOptionsValue;
    custom?: SelectOption[];
  };
};

// can add filter options as needed
export type FilterType = DropdownFilterType;

export type TableFilterOption = {
  isFilterable: boolean;
  inputType: FilterType;
  label: string;
  placeholder?: string;
  dataKeyName?: string;
};

export type TableHeaders = {
  text: string | JSX.Element;
  customStyle?: StyledComponent<any, any, any>;
  cellCss?: InterpolationWithTheme<any>;
  dataCellCss?: InterpolationWithTheme<any>;
  condtionalDataCellCss?: ConditionalCellCss[];
  conditionalDataCellRender?: (value: object) => any;
  tableDataKeyName: string;
  filterOptions?: TableFilterOption;
};

type DataTableSortState = {
  sortByKeyName: string;
  sortDirection: SortDirection;
};

type DataTableFilterStateOption = {
  value: "all" | any;
};

type DataTableFilterState = Record<string, DataTableFilterStateOption>;

interface DataTableProps {
  tableTitle?: string;
  tableData?: object[];
  tableHeaders: TableHeaders[];
  noDataMessage?: string;
  paginationControlOptions?: number[];
  className?: string;
  isDataSortable?: boolean;
  onLoadSortDataByKey?: string;
  tableDataActionsMenu?: TableAction[];
}

const DataTable: React.FC<DataTableProps> = (props) => {
  const {
    tableTitle = "",
    tableData = [],
    tableHeaders = [],
    noDataMessage = "",
    className = "",
    isDataSortable = false,
    onLoadSortDataByKey = "",
    paginationControlOptions = [],
    tableDataActionsMenu = [],
  } = props;

  // pagination state
  const [
    paginationControlsState,
    paginationControlsDispatch,
  ] = React.useReducer(PaginationControlsReducer, {
    ...defaultPaginationControlsState,
    selectedItemsPerPage: paginationControlOptions.length
      ? paginationControlOptions[0]
      : defaultPaginationOptions[0],
  });

  // filter menu state
  const [
    filterOptionsAnchorEl,
    setFilterOptionsAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);
  const closeFilterOptionsMenu = () => {
    setFilterOptionsAnchorEl(null);
  };
  const handleClickFilterOptionsButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setFilterOptionsAnchorEl(e.currentTarget);
  };

  // action menu state
  const [
    menuAnchorEl,
    setMenuAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [showActionMenuIndex, setShowActionMenuIndex] = React.useState<
    number | null
  >(null);
  const toggleShowActionMenu = (index: number) => {
    if (showActionMenuIndex === index) return setShowActionMenuIndex(null);
    setShowActionMenuIndex(index);
  };
  const closeActionsMenu = () => {
    setMenuAnchorEl(null);
    setShowActionMenuIndex(null);
  };

  // sort data state
  const [sortState, setSortState] = React.useState<DataTableSortState>({
    sortByKeyName: onLoadSortDataByKey,
    sortDirection: SortDirection.DESC,
  });

  // filter data state
  const [filterState, setFilterState] = React.useState<DataTableFilterState>(
    {}
  );

  const handleActionItemClicked = (dataCell: any, item: TableAction) => {
    item.onClick(dataCell);
    closeActionsMenu();
  };

  const sortByString = (a: string, b: string): number => {
    if (sortState.sortDirection === SortDirection.ASC) {
      if (b.toLowerCase() > a.toLowerCase()) {
        return 1;
      }

      if (b.toLowerCase() < a.toLowerCase()) {
        return -1;
      }

      return 0;
    }

    // descending
    if (b.toLowerCase() < a.toLowerCase()) {
      return 1;
    }

    if (b.toLowerCase() > a.toLowerCase()) {
      return -1;
    }

    return 0;
  };

  const sortByNumber = (a: number, b: number): number => {
    if (sortState.sortDirection === SortDirection.ASC) {
      return a - b;
    }

    // descending
    return b - a;
  };

  const getPaginatedTableData = (): object[] => {
    // parse filterState for evaluatable filters
    const filtersToApply: DataTableFilterState = {};
    for (let dataKeyName in filterState) {
      const value = filterState[dataKeyName].value;
      if (value && value !== "all") {
        filtersToApply[dataKeyName] = {
          value,
        };
      }
    }

    let filteredTableData = [...tableData];

    // fitler the tableData
    if (Object.keys(filtersToApply).length) {
      filteredTableData = tableData.filter((data, idx) => {
        // iterate through filters
        for (let dataKeyName in filtersToApply) {
          const valueToFilterOut = filtersToApply[dataKeyName].value;
          // todo: add support other types of filteration othen than unique values
          if (data[dataKeyName] !== valueToFilterOut) return false;
        }

        return true;
      });
    }

    // sort the tableData
    let sortedTableData = [...filteredTableData];

    if (isDataSortable && sortState.sortByKeyName && tableData.length) {
      sortedTableData = sortedTableData.sort((a, b) => {
        const aVal = a[sortState.sortByKeyName];
        const bVal = b[sortState.sortByKeyName];

        if (typeof aVal === "string") {
          return sortByString(aVal, bVal);
        }

        if (typeof aVal === "number") {
          return sortByNumber(aVal, bVal);
        }

        throw new Error(
          `Whoops, it appears your DataTable component contains a data type that is not yet supported. Please update this component to support sorting for this data type:${
            sortState.sortByKeyName
          } is a ${typeof aVal}`
        );
      });
    }

    // slice it to display paginated data only
    const paginatedTableData = sortedTableData.slice(
      (paginationControlsState.selectedPageNum - 1) *
        paginationControlsState.selectedItemsPerPage,
      paginationControlsState.selectedPageNum *
        paginationControlsState.selectedItemsPerPage
    );

    return paginatedTableData;
  };

  const paginatedTableData = getPaginatedTableData();

  const handleTableHeaderClicked = (
    _e: React.MouseEvent<HTMLTableCellElement>,
    itemKeyName: string
  ) => {
    if (isDataSortable && tableData.length) {
      // calculate new direction, if key name was clicked twice in a row, toggle direction
      // else default to descending
      let direction = SortDirection.DESC;
      if (sortState.sortByKeyName === itemKeyName) {
        direction =
          sortState.sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC;
      }
      setSortState({
        sortByKeyName: itemKeyName,
        sortDirection: direction,
      });

      // paginated data will automatically update on next render loop
    }
  };

  const validateConditionalDataCellCss = (
    conditionalDataCss: ConditionalCellCss[],
    value: any
  ): null | InterpolationWithTheme<any> => {
    let i = 0;
    while (i < conditionalDataCss.length) {
      const condition = conditionalDataCss[i];
      const rule = condition.rule;
      const css = condition.cellCss;
      const conditionPasses = rule(value);

      if (conditionPasses) {
        return css;
      }

      i = i + 1;
    }
    return null;
  };

  const renderTableDataCells = (item: object): JSX.Element[] => {
    // iterate through table headers to get the key name for each data point
    return tableHeaders.map((header, index) => {
      const {
        dataCellCss = css``,
        tableDataKeyName,
        condtionalDataCellCss = [],
        conditionalDataCellRender,
      } = header;

      // iterate through conditional css and apply first rule that passes true
      const validatedConditionCss = validateConditionalDataCellCss(
        condtionalDataCellCss,
        item[tableDataKeyName]
      );

      const joinedCss: any = [dataCellCss];
      if (validatedConditionCss) {
        joinedCss.push(validatedConditionCss);
      }
      return (
        <td css={joinedCss} key={index}>
          <span className="pq-data-point">
            {conditionalDataCellRender
              ? conditionalDataCellRender(item)
              : item[tableDataKeyName]}
          </span>
        </td>
      );
    });
  };

  const handleActionMenuButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    toggleShowActionMenu(index);
    setMenuAnchorEl(e.currentTarget);
  };

  const renderTableDataActionsMenu = (
    dataCell: any,
    index: number
  ): JSX.Element | null => {
    if (!tableDataActionsMenu.length) return null;

    console.log("tableDataActionsMenu: ", tableDataActionsMenu);

    return (
      <td className="cell-action-menu-body">
        <Button onClick={(e) => handleActionMenuButtonClicked(e, index)}>
          <i className="fas fa-ellipsis-h fa-2x" />
        </Button>
        {showActionMenuIndex === index && (
          <Menu
            TransitionComponent={Fade}
            id={`table-action-menu-${index}`}
            className="pq-popup-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={closeActionsMenu}
            PaperProps={{
              style: {
                transform: "translate(-75px,10px)",
              },
            }}
          >
            {tableDataActionsMenu.map((item, actionItemIndex) => {
              return (
                <MenuItem
                  className="cell-action-menu-body-item"
                  key={actionItemIndex}
                  onClick={() => handleActionItemClicked(dataCell, item)}
                >
                  <span className="mr-2 d-inline-block">{item.icon}</span>{" "}
                  {item.text}
                </MenuItem>
              );
            })}
          </Menu>
        )}
      </td>
    );
  };

  const renderTableData = (): JSX.Element | JSX.Element[] => {
    if (!tableData.length) {
      return (
        <tr>
          <td colSpan={7} className="no-surveys-msg">
            {noDataMessage}
          </td>
        </tr>
      );
    }

    return paginatedTableData.map((item, index) => {
      return (
        <tr key={index}>
          {renderTableDataCells(item)}

          {renderTableDataActionsMenu(item, index)}
        </tr>
      );
    });
  };

  const renderTableHeaders = (): JSX.Element[] => {
    return tableHeaders.map((item, index) => {
      const { cellCss = css``, tableDataKeyName } = item;
      // flip the caret if sort direction is ASC
      let flipCaretClass = "";
      if (
        item.tableDataKeyName === sortState.sortByKeyName &&
        sortState.sortDirection === SortDirection.ASC
      ) {
        flipCaretClass = "ascending-caret";
      }

      // show cursor pointer on hover for isDataSortable
      const cursorPointerHoverClass = isDataSortable ? "cursor-pointer" : "";
      const highlightCaretClass =
        tableDataKeyName === sortState.sortByKeyName ? "active-caret" : "";
      const highlightHeaderClass =
        tableDataKeyName === sortState.sortByKeyName ? "active-header" : "";
      return (
        <th
          onClick={(e) => handleTableHeaderClicked(e, tableDataKeyName)}
          key={index}
          className={`${cursorPointerHoverClass} ${highlightHeaderClass}`}
          css={cellCss}
        >
          {item.text}{" "}
          {isDataSortable && (
            <i
              className={`fas fa-caret-down ml-1 ${flipCaretClass} ${highlightCaretClass}`}
            />
          )}
        </th>
      );
    });
  };

  const getUniqueValues = (dataKeyName: string): SelectOption[] => {
    const seenMap = {};
    const results: any[] = [];
    // iterate through table data
    tableData.forEach((data, idx) => {
      const value = data[dataKeyName];

      // zeros are being omitted right now
      if (value && !seenMap[value.toString()]) {
        results.push(value);
        seenMap[value.toString()] = true;
      }
    });

    return results.map((result) => ({
      value: result,
      label: result.toString(),
    }));
  };

  const getTableFilterOptions = (): TableFilterOption[] => {
    const tableFilterOptions: TableFilterOption[] = [];
    tableHeaders.forEach((header) => {
      if (header.filterOptions && header.filterOptions.isFilterable) {
        tableFilterOptions.push({
          dataKeyName: header.tableDataKeyName,
          ...header.filterOptions,
        });
      }
    });

    return tableFilterOptions;
  };

  const handleFilterFormControlChanged = (
    e: React.ChangeEvent<any>,
    dataKeyName: string
  ) => {
    const newState = {
      ...filterState,
      [dataKeyName]: {
        value: e.target.value,
      },
    };

    setFilterState(newState);
  };

  const renderFilterDropdownFormControl = (
    filterOption: TableFilterOption
  ): JSX.Element => {
    const {
      label,
      inputType: {
        options: { values },
      },
      dataKeyName = "",
    } = filterOption;
    // determine which options to use
    let options: SelectOption[] = [];
    switch (values) {
      case FilterInputOptionsValue.UNIQUE:
        options = getUniqueValues(dataKeyName);
        break;

      default:
        options = [];
    }

    // try to sort the options
    const sortedOptions = options.sort();

    const inputOptions = sortedOptions.map((option, idx) => {
      return (
        <MenuItem key={idx} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });

    const filterValue =
      filterState[dataKeyName] && filterState[dataKeyName].value
        ? filterState[dataKeyName].value
        : "all";

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="demo-simple-select">{label}:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterValue}
          onChange={(e) => handleFilterFormControlChanged(e, dataKeyName)}
          fullWidth
        >
          <MenuItem value={"all"}>All</MenuItem>
          {inputOptions}
        </Select>
      </FormControl>
    );
  };

  const renderFilterFormControl = (
    filterOption: TableFilterOption
  ): JSX.Element => {
    const {
      inputType: { type },
    } = filterOption;

    switch (type) {
      case FilterInputTypes.DROPDOWN:
        return renderFilterDropdownFormControl(filterOption);
      default:
        return <span>Unsupported Filter Type</span>;
    }
  };

  const renderFilterOptionsInputs = (): JSX.Element[] => {
    const tableFilterOptions = getTableFilterOptions();

    const inputOptions = tableFilterOptions.map((option, idx) => {
      return (
        <div
          className="row align-items-center justify-content-center mb-4"
          key={idx}
        >
          <div className="col">{renderFilterFormControl(option)}</div>
        </div>
      );
    });

    return inputOptions;
  };

  const renderTableFilterOptions = (): JSX.Element | null => {
    const filterOptions = getTableFilterOptions();
    if (!filterOptions.length) return null;

    return (
      <div
        css={css`
          float: right;
        `}
      >
        <Button onClick={handleClickFilterOptionsButton}>
          <i className="fas fa-filter fa-2x" />
        </Button>

        {filterOptionsAnchorEl && (
          <Menu
            id={`table-filter-menu`}
            className={`table-filter-menu`}
            anchorEl={filterOptionsAnchorEl}
            keepMounted
            open={Boolean(filterOptionsAnchorEl)}
            onClose={closeFilterOptionsMenu}
            PaperProps={{
              style: {
                width: "240px",
              },
            }}
            MenuListProps={{
              style: {
                padding: 20,
              },
            }}
          >
            <h5>Filters</h5>
            {renderFilterOptionsInputs()}
            <Button>RESET</Button>
          </Menu>
        )}
      </div>
    );
  };

  return (
    <DataTableWrapper className={className}>
      <div className="above-table">
        <h3 className="data-table-header">
          {tableTitle}
          {renderTableFilterOptions()}
        </h3>
      </div>
      <div className="data-table-wrapper">
        <Table
          css={css`
            &.pq-table {
              width: 100%;
              table-layout: ${tableData.length ? "fixed" : "inherit"};
            }
          `}
        >
          <thead>
            <tr
              css={css`
                height: 48px;
              `}
            >
              {renderTableHeaders()}
              {tableDataActionsMenu.length !== 0 && (
                <th className="cell-action-menu-header"></th>
              )}
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </Table>
      </div>
      <PaginationControls
        itemsTotal={tableData.length}
        selectedItemsPerPage={paginationControlsState.selectedItemsPerPage}
        setItemsPerPage={(itemsPerPage: number) =>
          paginationControlsDispatch({
            type: SET_ITEMS_PER_PAGE,
            payload: itemsPerPage,
          })
        }
        currentPage={paginationControlsState.selectedPageNum}
        setCurrentPage={(pageNum: number) =>
          paginationControlsDispatch({ type: SET_PAGE_NUM, payload: pageNum })
        }
      />
    </DataTableWrapper>
  );
};

export default DataTable;
