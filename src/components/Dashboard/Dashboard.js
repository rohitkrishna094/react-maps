import React, { Component } from 'react';
import states from './states';

class Dashboard extends Component {
  listOfStates = states;

  onSelectMultipleStates = e => {
    const options = e.target.options;
    const values = [];

    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push({ id: options[i].value, name: options[i].text });
      }
    }

    console.log(values);
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
        <label>
          State
          <select size="5" onChange={this.onSelectMultipleStates} multiple={true}>
            {this.listOfStates.map(state => (
              <option key={state.stateId} value={state.stateId}>
                {state.stateName}
              </option>
            ))}
          </select>
        </label>
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
