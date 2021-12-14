import * as action_type from "./action_type";
import generateUniqueID from "../../utilities/generateUID";
import generatePatmentDueDate from "../../utilities/generatePaymentDateDue";

// Reducer actions
/*
 * Func to add a new invoice to state. In paylod we pass a new invoice, new UID, payment due and status.
 * If the passed type = 'new' return 'pending' else 'draft'
 * @param {object} invoice - obj of created invoice
 * @param {object} state - object of state
 * @param {string} type - str with a type of invoice
 */

export const addInvoice = (invoice, state, type) => {
  return {
    type: action_type.add_invoice,
    payload: {
      invoice,
      id: generateUniqueID(state.invoices),
      paymentDue: generatePatmentDueDate(
        invoice.createdAt,
        invoice.paymentTerms
      ),
      status: type === "new" ? "pending" : "draft",
    },
  };
};

/*
 * Func to save changes on editing an invoice. In payload we pass a new invoice, payment due and status 'pending'
 * @param {string} type - str with a type of invoice
 */

export const changeInvoice = (invoice) => {
  return {
    type: action_type.save_changes,
    payload: {
      invoice,
      paymentDue: generatePatmentDueDate(
        invoice.createdAt,
        invoice.paymentTerms
      ),
      status: "pending",
    },
  };
};

/*
 * Func to toggle form to edit an invoice. In payload we pass an id of editing invoice
 * @param {string} id - str with an invoice's id
 */

export const editInvoice = (id) => {
  return {
    type: action_type.edit_invoice,
    payload: { id },
  };
};

/*
 * Func to delete an invoice
 */

export const deleteInvoice = () => {
  return {
    type: action_type.delete_invoice,
  };
};

/*
 * Func to change a status of the invoce to 'paid'
 */

export const changeToPaidInvoice = () => {
  return {
    type: action_type.paid_invoice,
  };
};

/*
 * Func to toggle form to create a new invoice
 */

export const createInvoice = () => {
  return {
    type: action_type.create_invoice,
  };
};

/*
 * Func to discard/hide form
 */

export const discardInvoice = () => {
  return {
    type: action_type.discard_invoice,
  };
};

/*
 * Func to toggle modal. In payload we pass a name of modal and id of invoice
 * to display which modal is to be displayed
 * @param {string} id - str of invoice's id
 * @param {string} name - str of modal's name ('delete' or 'status')
 */

export const toggleModal = (name, id) => {
  return {
    type: action_type.toggle_modal,
    payload: { name: name ? name : "", id: id ? id : "" },
  };
};

/*
 * Func to set errors state. In payload we pass an obj of errors and arr of error msgs
 * @param {object} err - object of errors
 * @param {object} msg - arr of error msgs
 */

export const setErrors = (err, mgs) => {
  return {
    type: action_type.set_errors,
    payload: { err, mgs },
  };
};
