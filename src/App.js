import React, { Component } from "react";
import Header from "./components/Header";
import Action from "./components/Action";
import Options from "./components/Options";
import AddOption from "./components/AddOption";
import OptionModal from "./components/OptionModal";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePickClose = this.handlePickClose.bind(this);

    this.state = {
      options: props.options,
      selectedOption: undefined,
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState({
          options: options,
        });
      }
    } catch (error) {}
  }

  handleAddOption(option) {
    if (this.state.options.indexOf(option) == -1) {
      this.setState({
        options: [...this.state.options, option],
      });
      return "";
    } else {
      return "This option already exists";
    }
  }

  handlePick() {
    const randomNo = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNo];
    this.setState({
      selectedOption: option,
    });
  }

  handlePickClose() {
    this.setState({
      selectedOption: undefined,
    });
  }

  handleDeleteOptions() {
    this.setState({ options: [] });
  }

  handleDeleteOption(optionToBeDeleted) {
    const array = this.state.options.filter((option) => {
      return option != optionToBeDeleted;
    });
    this.setState({
      options: array,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  render() {
    return (
      <div>
        <Header subtitle="Put your life in the hands of a computer." />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              handleDeleteOption={this.handleDeleteOption}
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
          <OptionModal
            handlePickClose={this.handlePickClose}
            selectedOption={this.state.selectedOption}
          />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  options: ["One", "Two", "Three"],
};
export default App;
