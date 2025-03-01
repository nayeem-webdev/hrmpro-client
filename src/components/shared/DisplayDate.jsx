import { format, parseISO } from "date-fns"; // Install date-fns if not already installed
import PropTypes from "prop-types";

const DisplayDate = ({ date }) => {
  const readableDate = format(parseISO(date), "dd/MM/yyyy");

  return <span>{readableDate}</span>;
};

DisplayDate.propTypes = {
  date: PropTypes.string,
};

export default DisplayDate;
