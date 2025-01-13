import PropTypes from "prop-types";

const Title = ({ backgroundImage, pageName, subHeading }) => {
  return (
    <div
      className="w-full h-60 flex flex-col justify-center items-center text-white relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <h1 className="relative text-3xl md:text-5xl font-bold uppercase z-10">
        {pageName}
      </h1>
      {subHeading && (
        <p className="relative text-md md:text-xl mt-4 z-10">{subHeading}</p>
      )}
    </div>
  );
};

Title.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
};

export default Title;
