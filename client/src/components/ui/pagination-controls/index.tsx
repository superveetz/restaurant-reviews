import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Pagination, Form, ListGroup } from "react-bootstrap";

// src
import { defaultPaginationOptions } from "./reducer";

const PaginationControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface PaginationControlsProps {
  className?: string;
  currentPage?: number;
  itemsTotal: number;
  selectedItemsPerPage: number;
  paginationOptions?: number[];
  setCurrentPage: (pageNum: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = (props) => {
  const {
    currentPage = 1,
    itemsTotal = 0,
    setCurrentPage,
    setItemsPerPage,
    selectedItemsPerPage,
    paginationOptions = [],
    className = "",
  } = props;

  const itemsPerPageOptions = paginationOptions.length
    ? paginationOptions
    : defaultPaginationOptions;

  const handleItemsPerPageChanged = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.currentTarget.value));
  };

  const lastPage = Math.ceil(itemsTotal / selectedItemsPerPage);

  return (
    <PaginationControlsWrapper className={className}>
      <ListGroup horizontal>
        <ListGroup.Item className="border-0">
          <Form inline>
            <Form.Group controlId="pagination-select">
              <Form.Label>Items per page</Form.Label>
              <Form.Control
                as="select"
                className="ml-2"
                onChange={handleItemsPerPageChanged}
                value={selectedItemsPerPage}
              >
                {itemsPerPageOptions.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </ListGroup.Item>
        <ListGroup.Item className="border-0">
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item onClick={() => setCurrentPage(currentPage)}>
              {currentPage}
            </Pagination.Item>
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === lastPage}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(lastPage)}
              disabled={currentPage === lastPage}
            />
          </Pagination>
        </ListGroup.Item>
      </ListGroup>
    </PaginationControlsWrapper>
  );
};

export default PaginationControls;
