const baseUrl = 'http://localhost:8080/api';
// const baseUrl = 'https://liacob.herokuapp.com/api';

export const getData = (
  stateName,
  stateId,
  groupMembers,
  individualMembers,
  medicareMembers,
  medicaidMembers,
  errFunc,
  callback
) => {
  fetch(
    `${baseUrl}/recovery?stateName=${stateName}&stateId=${stateId}&groupMembers=${groupMembers}&individualMembers=${individualMembers}&medicareMembers=${medicareMembers}&medicaidMembers=${medicaidMembers}`
  )
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => errFunc(err));
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
    .then(res => res.json())
    .then(json => callback(json))
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
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => errFunc(err));
};

const backupData = [
  {
    stateName: 'IN',
    stateId: 26,
    groupMembers: 400,
    individualMembers: 40000,
    medicareMembers: 500,
    medicaidMembers: 79
  },
  {
    stateName: 'MI',
    stateId: 28,
    groupMembers: 400,
    individualMembers: 40000,
    medicareMembers: 500,
    medicaidMembers: 79
  },
  {
    stateName: 'IL',
    stateId: 20,
    groupMembers: 400,
    individualMembers: 40000,
    medicareMembers: 500,
    medicaidMembers: 79
  }
];

export const postData = (data, errFunc, callback) => {
  fetch(`${baseUrl}/recovery`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(backupData)
  })
    .then(res => res.json())
    .then(json => callback(json))
    .catch(err => errFunc(err));
};
