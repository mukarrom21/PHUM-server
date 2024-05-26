const name = {
  firstName: 'Md',
  middleName: 'Mukarrom',
  lastName: 'Hosain',
}

const unMuted = {}

for (const [key, value] of Object.entries(name)) {
  unMuted[`name.${key}`] = value
}

console.log(unMuted)
/* {
  'name.firstName': 'Md',       
  'name.middleName': 'Mukarrom',
  'name.lastName': 'Hosain'     
} */
