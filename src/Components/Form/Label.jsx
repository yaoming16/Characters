import PropTypes from "prop-types";

function Label({ htmlFor, className, text, warning }) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={
          "block mb-2 text-sm font-medium text-black " +
          className +
          (warning ? " text-red-600" : "")
        }
      >
        {text}
      </label>
      {warning ? <p className="text-red-600"></p> : ""}
    </>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
  warning: PropTypes.bool,
};

export default Label;
