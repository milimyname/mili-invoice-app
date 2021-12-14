import { useReducedMotion } from "framer-motion";
import { useGlobalContext } from "../App/context";
import Filter from "./filter/Filter";
import List from "./list/List";
import Button from "../shared/button/Button";
import invoicesLengthMessage from "../../utilities/invoicesLengthMessage";
import { invoicesVariants } from "../../utilities/framerVariants";
import { Container, Header, Info, Title, Text } from "./StyledInvoices";

const Invoices = () => {
  const { windowWidth, createInvoice, filteredInvoices, filterType } =
    useGlobalContext();
  const isDesktop = windowWidth >= 768;
  const shouldReduceMotion = useReducedMotion();
  const variant = (element) => {
    return shouldReduceMotion
      ? invoicesVariants.reduced
      : invoicesVariants[element];
  };

  return (
    <Container>
      <Header
        variants={variant("header")}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Info>
          <Title>Invoices</Title>
          <Text>
            {invoicesLengthMessage(filteredInvoices, filterType, windowWidth)}
          </Text>
        </Info>
        <Filter isDesktop={isDesktop} />
        <Button type="button" $newInvoice onClick={createInvoice}>
          New {isDesktop && "Invoice"}
        </Button>
      </Header>
      <List />
    </Container>
  );
};

export default Invoices;
