import { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'shorts',
    amount: 30.99,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'books',
    amount: 20.99,
    date: new Date('2022-08-18'),
  },
  { id: 'e4', description: 'tv', amount: 399.99, date: new Date('2022-02-15') },
  {
    id: 'e5',
    description: 'books',
    amount: 15.25,
    date: new Date('2022-08-22'),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    case 'UPDATE':
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      )
      const updateableExpense = state[expenseIndex]
      const updatedItem = { ...updateableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[expenseIndex] = updatedItem
      return updatedExpenses
    default:
      return state
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
