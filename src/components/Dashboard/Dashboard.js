import React, { Component } from 'react';
import {Form, Input,Row, Col} from 'antd';

class Dashboard extends Component {
  render() {
    return (
    <form>

    <label>Group Members
    <input type="text" name="GrpMembers"/>
    </label>

    <label>Individual Members
    <input type="text" name="IndvMembers"/>
    </label>

    <label>State
    <select>
    <option value="all">All</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>

    </label>

    <label>Medicare Members
    <input type="text" name="MedicareMembers"/>
    </label>

    <label>Medicaid Members
    <input type="text" name="MedicaidMembers"/>
    </label>

    <label>Combination
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

