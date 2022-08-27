import { Text, View, StyleSheet } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})

export default ExpensesOutput
