import React, { Component } from "react";

const Option = (props) => {
  return (
    <div className="option">
      <p contentEditable={true} className="option__text">
        {props.count}. {props.optionText}
      </p>
      <button
        className="button button--link"
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

export default Option;
