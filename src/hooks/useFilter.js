import { useState, useEffect, useRef } from "react";

const initialFilterType = "all";

const useFilter = (callback) => {
  const [filteredInvoices, SetFilteredInvoices] = useState(callback.invoice);
  const [filterType, SetFitlerType] = useState(initialFilterType);
  const previosFilterType = useRef(initialFilterType);

  /*
   * Func to filter filteredInvoices based on filter type
   * @param {string} type - filter type
   */

  const handleFilter = (type) => {
    if (type === initialFilterType)
      return SetFilteredInvoices(callback.invoices);

    const newInvoices = callback.invoices.filter(
      (item) => item.status === type
    );
    SetFilteredInvoices(newInvoices);
  };

  // Run useEffect() whenever callback changes and call handleFilter() with a current type
  useEffect(() => {
    handleFilter(filterType);
  }, [callback]);

  /*
   * Func to change filter based on passed props
   * Call handlefilter() to change filteredInvoices based on filter type
   * @param {string} event - filter type
   */

  const changeFilterType = (event) => {
    const type = event.target.value;

    if (previosFilterType.current === type) {
      previosFilterType.current = initialFilterType;
      handleFilter(initialFilterType);
      return SetFitlerType(initialFilterType);
    }

    previosFilterType.current = type;
    handleFilter(type);
    SetFitlerType(type);
  };

  return {
    filteredInvoices,
    filterType,
    changeFilterType,
  };
};

export default useFilter;
