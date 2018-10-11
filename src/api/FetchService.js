// const baseUrl = 'http://localhost:8080/api';
const baseUrl = 'https://liacob.herokuapp.com/api';

export const getData = (stateName, stateId, groupMembers, individualMembers, medicareMembers, medicaidMembers) => {
  fetch(
    `${baseUrl}/recovery?stateName=${stateName}&stateId=${stateId}&groupMembers=${groupMembers}&individualMembers=${individualMembers}&medicareMembers=${medicareMembers}&medicaidMembers=${medicaidMembers}`
  )
    .then(data => data)
    .catch(err => err);
};

export const getDataDefault = (
  groupMembers,
  individualMembers,
  medicareMembers,
  medicaidMembers,
  errFunc,
  callback
) => {
  fetch(
    `${baseUrl}/recovery?stateName=MI&stateId=26&groupMembers=${groupMembers}&individualMembers=${individualMembers}&medicareMembers=${medicareMembers}&medicaidMembers=${medicaidMembers}`
  )
    .then(data => callback(data.json()))
    .catch(err => errFunc(err));
};

export const getSomeRandomData = (errFunc, callback) => {
  const stateName = 'IN';
  const stateId = 18;
  const groupMembers = 400000;
  const individualMembers = 300000;
  const medicareMembers = 20000;
  const medicaidMembers = 40000;

  fetch(
    `${baseUrl}/recovery?stateName=${stateName}&stateId=${stateId}&groupMembers=${groupMembers}&individualMembers=${individualMembers}&medicareMembers=${medicareMembers}&medicaidMembers=${medicaidMembers}`
  )
    .then(data => callback(data.json()))
    .catch(err => errFunc(err));
};
