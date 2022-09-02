import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
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
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
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
