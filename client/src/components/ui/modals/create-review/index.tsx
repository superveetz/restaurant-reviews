import React from "react";
import { jsx } from "@emotion/core";
import { Formik, Form, FormikProps, ErrorMessage } from "formik";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { Modal } from "react-bootstrap";

// src
import { ReviewModel } from "models/Review";
import Button from "components/ui/button";
import StarRating from "components/ui/star-rating";

interface CreateReviewFormValues {
  starRating: number;
  title: string;
  comment: string;
}

const CreateReviewFormValidationSchema = yup.object().shape({
  // seems it is not possible to reference own field value without causing recursive error
  // used 'email' field as a clone for the login field so that i can reference that field to obtain the same value for 'login'
  starRating: yup.number().min(1, "Please choose a star rating"),
  title: yup.string().required("Required"),
  comment: yup.string().required("Required"),
});

interface CreateReviewModalProps {
  restaurantName: string;
  restaurantId: string;
  showModal: boolean;
  isCreatingReview: boolean;
  currentUserId: string;
  handleCloseModal: () => void;
  afterFormSubmit: (review: ReviewModel) => void;
}
const CreateReviewModal: React.FC<CreateReviewModalProps> = (props) => {
  const {
    showModal,
    handleCloseModal,
    isCreatingReview,
    restaurantId,
    currentUserId,
    afterFormSubmit,
  } = props;

  const handleCreateReviewFormSubmit = async (
    values: CreateReviewFormValues
  ) => {
    afterFormSubmit({
      title: values.title,
      starRating: values.starRating,
      comment: values.comment,
      authorId: currentUserId,
      restaurantId: restaurantId,
    });
  };

  const renderCreateReviewButtonText = (): JSX.Element | string => {
    if (isCreatingReview) {
      return (
        <span>
          CREATING REVIEW <i className="fas fa-spinner fa-spin"></i>
        </span>
      );
    }
    return "CREATE REVIEW";
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Review for Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            starRating: 0,
            title: "",
            comment: "",
          }}
          validationSchema={CreateReviewFormValidationSchema}
          onSubmit={handleCreateReviewFormSubmit}
          render={(formikBag: FormikProps<CreateReviewFormValues>) => (
            <Form className="" noValidate>
              {/* Title */}
              <div className="row align-items-center justify-content-center mb-4">
                <div className="col">
                  <TextField
                    autoComplete={"off"}
                    autoFocus={true}
                    className="w-100"
                    id="title"
                    name="title"
                    type="text"
                    label="Title"
                    placeholder="janedoe@gmail.com"
                    value={formikBag.values.title}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    variant="outlined"
                    required
                    error={
                      !!formikBag.touched.title && !!formikBag.errors.title
                    }
                    helperText={
                      formikBag.touched.title && !!formikBag.errors.title
                        ? formikBag.errors.title
                        : null
                    }
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="row align-items-center justify-content-center mb-4">
                <div className="col">
                  <TextField
                    multiline
                    rowsMax={4}
                    rows={4}
                    autoComplete={"off"}
                    autoFocus={true}
                    className="w-100"
                    id="comment"
                    name="comment"
                    type="text"
                    label="Comment"
                    placeholder="Write your review.."
                    value={formikBag.values.comment}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    variant="outlined"
                    required
                    error={
                      !!formikBag.touched.comment && !!formikBag.errors.comment
                    }
                    helperText={
                      formikBag.touched.comment && !!formikBag.errors.comment
                        ? formikBag.errors.comment
                        : null
                    }
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div className="row align-items-center justify-content-center mb-4">
                <div className="col">
                  <StarRating
                    onChange={(starRating: number) =>
                      formikBag.setValues({
                        ...formikBag.values,
                        starRating,
                      })
                    }
                    rating={formikBag.values.starRating}
                  />
                  <div>
                    <ErrorMessage name="starRating" />
                  </div>
                </div>
              </div>

              {/* <pre>{JSON.stringify(formikBag, null, 4)}</pre> */}

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={isCreatingReview}
                >
                  {renderCreateReviewButtonText()}
                </Button>
              </div>
            </Form>
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button onClick={handleCloseModal}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateReviewModal;
