import React, { Component } from 'react';
import states from './states';
import Select from 'react-select';
import App from '../../App.css';

class Dashboard extends Component {
  listOfStates = states;

  state = {
    selectedOption: { label: 'Michigan', value: '26' },
    values: []
  };

  handleChange = values => {
    // this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
    if (values.length < 4) {
      this.setState({ values });
      const statesArray = values;
      this.props.callback('states', values);
    }
  };

  fillData = e => {
    const input = { [e.target.name]: e.target.value };
    this.props.callback('input', input);
  };

  render() {
    return (
      <form>
        <label>
          Group Members
          <input type="text" name="groupMembers" onChange={this.fillData} />
        </label>
        <label>
          Individual Members
          <input type="text" name="individualMembers" onChange={this.fillData} />
        </label>
        {/* //Default Drop Down Values */}
        <label>State</label>
        <Select
          className="design"
          value={this.state.values}
          options={this.listOfStates}
          isSearchable={true}
          isMulti={true}
          onChange={values => this.handleChange(values)}
        />
        <label>
          Medicare Members
          <input type="text" name="medicareMembers" onChange={this.fillData} />
        </label>
        <label>
          Medicaid Members
          <input type="text" name="medicaidMembers" onChange={this.fillData} />
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
