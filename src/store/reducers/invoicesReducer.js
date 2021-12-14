import * as action_type from "../actions/action_type";

export const invoicesReducer = (state, action) => {
  if (action.type === action_type.add_invoice) {
    const newList = [
      {
        ...action.payload.invoice,
        id: action.paylod.id,
        paymentDue: action.payload.paymentDue,
        status: action.payload.status,
        total: action.payload.invoice.items.reduce((curr, acc) => {
          return (curr += acc.total);
        }, 0),
        ...state.invoices,
      },
    ];

    return { ...state, isFormOpen: false, invoices: newList };
  }

  if (action.type === action_type.save_changes) {
    const newList = state.invoices.map((invoice) => {
      if (invoice.id === state.currInvoiceIndex) {
        return { ...action.payload.invoice, status: "pending" };
      }
      return invoice;
    });

    return {
      ...state,
      invoices: newList,
      isFormOpen: false,
      isInvoiceEdited: false,
    };
  }

  if (action.type === action_type.edit_invoice) {
    return {
      ...state,
      isFormOpen: true,
      isInvoiceEdited: true,
      currInvoiceIndex: action.payload.id,
    };
  }

  if (action.type === action_type.delete_invoice) {
    const newList = state.invoices.filter(
      (invoice) => invoice.id !== state.currInvoiceIndex
    );
    return {
      ...state,
      invoices: newList,
      isModalOpen: {
        status: false,
        name: "",
      },
    };
  }

  if (action.type === action_type.paid_invoice) {
    const newList = state.invoices.map((invoice) => {
      if (invoice.id === state.currInvoiceIndex) invoice.status = "paid";
      return invoice;
    });
    return {
      ...state,
      invoices: newList,
      isModalOpen: {
        status: false,
        name: "",
      },
    };
  }

  if (action.type === action_type.create_invoice) {
    return {
      ...state,
      isFormOpen: true,
    };
  }

  if (action.type === action_type.discard_invoice) {
    return {
      ...state,
      isFormOpen: false,
      isInvoiceEdited: false,
    };
  }

  if (action.type === action_type.toggle_modal) {
    return {
      ...state,
      isModalOpen: {
        status: !state.isModalOpen.status,
        name: action.payload.name,
      },
      currInvoiceIndex: action.payload.id,
    };
  }

  if (action.type === action_type.set_errors) {
    return {
      ...state,
      errors: {
        err: action.payload.err,
        msg: action.payload.msg,
      },
    };
  }

  throw new Error("no matching action type");
};
