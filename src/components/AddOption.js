import React, { Component } from "react";

class AddOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = document.getElementById("optionInput");
    if (option.value) {
      var error = this.props.handleAddOption(option.value);
      if (error != undefined) {
        this.setState({
          error: error,
        });
      }
      option.value = "";
    } else {
      alert("Input string can't be blank");
    }
  }
  render() {
    return (
      <div>
        {this.state.error && (
          <p className="add-option-error">{this.state.error}</p>
        )}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input
            autoComplete="off"
            className="add-option__input"
            id="optionInput"
            name="option"
            type="text"
            placeholder="enter option here.."
          />
          <button className="button" type="submit">
            Add Option
          </button>
        </form>
      </div>
    );
  }
}

export default AddOption;
