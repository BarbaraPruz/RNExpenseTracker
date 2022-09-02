import { useEffect, useState, useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch {
        setError('Could not fetch expenses.')
      }

      setIsFetching(false)
    }
    getExpenses()
  }, [])

  const today = new Date()
  const date7DaysAgo = getDateMinusDays(today, 7)

  const recentExpenses = expensesCtx.expenses.filter(
    (expense) => expense.date > date7DaysAgo,
  )

  function errorHandler() {
    setError(null)
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses found for last 7 days"
    />
  )
}

export default RecentExpenses
