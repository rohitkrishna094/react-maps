import React, { Component } from 'react';
import states from './states';
import Select from 'react-select';
import App from '../../App.css';

// const defaultSelectOption = { label: 'Michigan', value: 26 };

class Dashboard extends Component {
  listOfStates = states;

  constructor(props) {
    super(props);
    this.state = {
      values: [{ label: 'Michigan', value: '26' }],
      inputValues: {
        groupMembers: props.inputValues.groupMembers,
        individualMembers: props.inputValues.individualMembers,
        medicareMembers: props.inputValues.medicareMembers,
        medicaidMembers: props.inputValues.medicaidMembers
      }
    };
  }

  handleChange = values => {
    if (values.length < 4) {
      this.setState({ values });
      this.props.callback('states', values);
    }
  };

  fillData = e => {
    const input = { [e.target.name]: e.target.value };
    this.props.callback('input', input);

    this.setState({
      inputValues: {
        ...this.state.inputValues,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <form>
        <label>
          Group Members
          <input
            type="text"
            name="groupMembers"
            onChange={this.fillData}
            value={this.state.inputValues.groupMembers || ''}
          />
        </label>
        <label>
          Individual Members
          <input
            type="text"
            name="individualMembers"
            onChange={this.fillData}
            value={this.state.inputValues.individualMembers || ''}
          />
        </label>
        <label>State</label>
        <Select
          className="design"
          value={this.state.values}
          options={this.listOfStates}
          isSearchable={true}
          isMulti={true}
          onChange={values => this.handleChange(values) || ''}
          isClearable={true}
        />
        <label>
          Medicare Members
          <input
            type="text"
            name="medicareMembers"
            onChange={this.fillData}
            value={this.state.inputValues.medicareMembers || ''}
          />
        </label>
        <label>
          Medicaid Members
          <input
            type="text"
            name="medicaidMembers"
            onChange={this.fillData}
            value={this.state.inputValues.medicaidMembers}
          />
        </label>
        <label>
          Combination
          <select>
            <option value="all">All</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </label>
      </form>
    );
  }
}

export default Dashboard;
