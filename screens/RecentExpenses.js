import { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext)

  const today = new Date()
  const date7DaysAgo = getDateMinusDays(today, 7)

  const recentExpenses = expensesCtx.expenses.filter(
    (expense) => expense.date > date7DaysAgo,
  )
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses found for last 7 days"
    />
  )
}

export default RecentExpenses
