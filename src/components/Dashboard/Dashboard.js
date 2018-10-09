import React, { Component } from 'react';
import states from './states';
import Select from 'react-select';

class Dashboard extends Component {
  listOfStates = states;

  state = {
    selectedOption: { label: 'Michigan', value: '26' }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <form>
        <label>
          Group Members
          <input type="text" name="GrpMembers" />
        </label>
        <label>
          Individual Members
          <input type="text" name="IndvMembers" />
        </label>
        {/* //Default Drop Down Values */}
        <label>State</label>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={this.listOfStates}
          isSearchable={false}
        />
        <label>
          Medicare Members
          <input type="text" name="MedicareMembers" />
        </label>
        <label>
          Medicaid Members
          <input type="text" name="MedicaidMembers" />
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
