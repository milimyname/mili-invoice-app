import React, { useEffect, useState, useContext } from "react";
import Provider from "../shared/provider/Provider";
import useThemeToggle from "../../hooks/useThemeToggle";
import useFilter from "../../hooks/useFilter";
import useManageInvoices from "../../hooks/useManageInvoices";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { theme, toggleTheme } = useThemeToggle();
  const {
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
  } = useManageInvoices();
  const { filteredInvoices, filterType, changeFilterType } = useFilter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Assign window width value to a windowWidth state
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Listen for window resize and call handleResize()
  useEffect(() => {
    window.addEventListener("window", handleResize);
    return () => {
      window.removeEventListener("window", handleResize);
    };
  }, [windowWidth]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        filteredInvoices,
        filterType,
        changeFilterType,
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
      }}
    >
      <Provider themeColor={theme}>{children}</Provider>
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
