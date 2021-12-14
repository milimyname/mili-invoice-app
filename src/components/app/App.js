import { useLocation, Switch, Route } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useGlobalContext } from "./context";
import Wrapper from "../wrapper/Wrapper";
import Header from "../header/Header";
import Invoices from "../invoices/Invoices";
import FormController from "../formController/FormController";
import InvoiceView from "../invoiceView/InvoiceView";
import Modal from "../modal/Modal";
import RouteError from "../routeError/RouteError";

const App = () => {
  const { state } = useGlobalContext();
  const isModalOpen = state.isModalOpen.status;
  const isFormOpen = state.isFormOpen;
  const location = useLocation();

  return (
    <Wrapper>
      <Header />
      <AnimatePresence>
        {isFormOpen && <FormController />}
        {isModalOpen && <Modal />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Invoices />
          </Route>
          <Route exact path="/invoices/:id" children={<InvoiceView />} />
          <Route exact path="*">
            <RouteError />
          </Route>
        </Switch>
      </AnimatePresence>
    </Wrapper>
  );
};

export default App;
