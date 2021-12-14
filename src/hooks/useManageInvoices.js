import { useState, useEffect, useReducer } from "react";
import { invoicesReducer } from "../store/reducers/invoicesReducer";
import * as actions from "../store/actions/invoiceActions";
import allowOnlyNumbers from "../utilities/allowOnlyNumbers";
import validateForm from "../utilities/validateForm";
import data from "../data/data.json";

/*
 * Func to get invoices array form localStorage
 * @return {object} array of invoices
 */

const getInvoicesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("invoices"));

/*
 * Func to set invoices array to localStorage
 * @param {object} array of invoices
 */

const setInoicesToLocalStorage = (invoices) =>
  localStorage.setItem("invoices", JSON.stringify(invoices));

// Initial state values
const initialAddress = {
  street: "",
  city: "",
  postCode: "",
  country: "",
};

const initialItems = {
  name: "",
  quantity: 0,
  price: 0,
  total: 0,
};

const initialInvoice = {
  createdAt: new Date(),
  paymentDue: ``,
  description: "",
  paymentTerms: "30",
  clientName: "",
  clientEmail: "",
  senderAddress: initialAddress,
  clientAddress: initialAddress,
  items: [],
  total: 0,
};

const initialState = {
  invoices: getInvoicesFromLocalStorage() || data,
  isFormOpen: false,
  isModalOpen: { status: false, name: "" },
  isInvoiceEdited: false,
  currInvoiceIndex: null,
  errors: { err: {}, msg: {} },
};

// Custom hook to handle invoices and forms

const useManageInvoices = () => {
  const [state, dispatch] = useReducer(invoicesReducer, initialState);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [senderAddress, setSenderAddress] = useState(initialAddress);
  const [clientAddress, setClientAddress] = useState(initialAddress);
  const [items, setItems] = useState([]);

  // Update invoice state everytime when depeendency array changes
  useEffect(() => {
    setInvoice((oldState) => {
      return { ...oldState, senderAddress, clientAddress, items };
    });
  }, [senderAddress, clientAddress, items]);

  // Call setInvoicesToLocalStorage() everytime when dependecy array changes
  useEffect(() => {
    setInoicesToLocalStorage(state.invoices);
  }, [state.invoices]);

  // Helpers

  /*
   * Func to set all states resposible for displaying date to inputs with current edited invoice data
   * @param {number} index - id of edited invoice
   */

  const setEditedInvoice = (index) => {
    const invoice = state.invoices.find((invoice) => invoice.id === index);
    setInvoice(invoice);
    setClientAddress(invoice.clientAddress);
    setSenderAddress(invoice.senderAddress);
    setItems(invoice.items);
  };

  /*
   * Func to restore all states to intitial state
   */

  const restoreToInitial = () => {
    setInvoice(initialInvoice);
    setClientAddress(initialAddress);
    setSenderAddress(initialAddress);
    setItems([]);
    setErrors({}, []);
  };

  // Dispatchers

  /*
   * Func to add invoice to state
   * @param {object} invoice - object of created invoice
   * @param {string} state - object of state
   * @param {string} type - type of invoice (new or draft)
   */
  const addInvoice = (invoice, state, type) => {
    dispatch(actions.addInvoice(invoice, state, type));
  };

  /*
   * Func to save changes on editing invoice
   * @param {object} invoice - object of created invoice
   */
  const changeInvoice = (invoice) => {
    dispatch(actions.changeInvoice(invoice));
  };

  /*
   * Func to toggle form to edit existing invoice
   * @param {number} index - id of editing invoice
   */
  const editInvoice = (index) => {
    dispatch(actions.editInvoice(index));
    setEditedInvoice(index);
  };

  /*
   * Func to delete invoice
   */
  const deleteInvoice = () => {
    dispatch(actions.deleteInvoice());
  };

  /*
   * Func to change invoice's status to 'paid'
   */
  const changeToPaidInvoice = () => {
    dispatch(actions.changeToPaidInvoice());
  };

  /*
   * Func to toggle form to create new invoice
   */
  const createInoice = () => {
    dispatch(actions.createInvoice());
  };

  /*
   * Func to discard/hide form
   */
  const discardInvoice = () => {
    dispatch(actions.discardInvoice());
  };

  /*
   * Func to toggle modal
   * @param {number} index - invoice's id
   * @param {string} name - modal's name ('delete' or 'status')
   */
  const toggleModal = (index, name) => {
    dispatch(actions.toggleModal(index, name));
  };

  /*
   * Func to set errors state
   * @param {object} err - error object
   * @param {object} msg - messages array
   */
  const setErrors = (err, msg) => {
    dispatch(actions.setErrors(err, msg));
  };

  // Handlers

  /*
   * Func to handle user inputs. Update appropriate state based on gine type prop
   * @param {object} event - event (pass false if type is date)
   * @param {string} type - string with state to edit (invoice, clientAddress, senderAddress, items and date)
   * @param {object} date - date instance (pass false if type is not date)
   * @param {number} index - index of items (only for type of items)
   */

  const handleInvoiceChange = (event, type, date, index) => {
    let name = event ? event.target.name : null;
    let value = event ? event.target.value : null;

    switch (type) {
      case "invoice":
        setInvoice({ ...invoice, [name]: value });
        break;
      case "senderAddress":
        setInvoice({ ...senderAddress, [name]: value });
        break;
      case "clientAddress":
        setInvoice({ ...clientAddress, [name]: value });
        break;
      case "date":
        setInvoice((oldState) => {
          return { ...oldState, ["createdAt"]: date };
        });
        break;
      case "items":
        const newItems = [...items];
        if (name === "quantity" || name === "price")
          newItems[index][name] = allowOnlyNumbers(value);
        else newItems[index][name] = value;
        newItems[index]["total"] =
          newItems[index].price * newItems[index].quantity;
        setItems(newItems);
        break;
      default:
        throw new Error("no matching type");
    }
  };

  /*
   * Func to add another object with initialItems value to Items state
   * to render another item with inputs in form Item list.
   */
  const handleItemsAdd = () => setItems([...items, { ...initialItems }]);

  /*
   * Func to remove item from items array
   * @param {number} index - index of deleted item
   */
  const handleItemsRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (event, type) => {
    event.preventDefault();

    if (type === "add" && validateForm(invoice, setErrors)) {
      addInvoice(invoice, state, "new");
      restoreToInitial();
    } else if (type === "save") {
      actions.addInvoice(invoice, state, "draft");
      restoreToInitial();
    } else if (type === "change" && validateForm(invoice, setErrors)) {
      changeInvoice(invoice);
      restoreToInitial();
    }
  };

  return {
    state,
    invoice,
    senderAddress,
    clientAddress,
    items,
    handleInvoiceChange,
    handleItemsAdd,
    handleItemsRemove,
    handleSubmit,
    editInvoice,
    deleteInvoice,
    changeToPaidInvoice,
    createInoice,
    discardInvoice,
    toggleModal,
  };
};

export default useManageInvoices;
