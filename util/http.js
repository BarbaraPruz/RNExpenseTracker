import axios from 'axios'

const BASE_URL =
  'https://react-native-expenses-552e2-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
  const response = await axios.post(BASE_URL + '/expenses.json', expenseData)
  const id = response.data.name
  return id
}

export async function fetchExpenses() {
  const response = await axios.get(BASE_URL + '/expenses.json')
  const expenses = []
  for (const key in response.data) {
    const { amount, date, description } = response.data[key]
    expenses.push({ id: key, amount, date: new Date(date), description })
  }
  return expenses
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`)
}
