import React from "react";
import PropTypes from "prop-types";

const FileHandlingForm = ({ handleFiles }) => {
  return (
    <div>
      <form>
          <h3>Points on Canvas....</h3>
        <fieldset>
          <label>
            <strong>CSV File: &nbsp;</strong>
          </label>
          <input
            type="file"
            id="csvFileInput"
            onChange={event => handleFiles(event)}
            accept=".csv"
          />
        </fieldset>
      </form>
    </div>
  );
};

FileHandlingForm.propTypes = {
  handleFiles: PropTypes.func.isRequired
};

export default FileHandlingForm;
