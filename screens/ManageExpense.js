import { useLayoutEffect, useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import IconButton from '../components/UI/IconButton'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = isEditing
    ? expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)
    : null

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch {
      setError('Could not delete expense')
    }
    setIsSubmitting(false)
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ id, ...expenseData })
      }
      navigation.goBack()
    } catch {
      setError('Cound not save expense')
    }
    setIsSubmitting(false)
  }

  function errorHandler() {
    setError(null)
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
export default ManageExpense
