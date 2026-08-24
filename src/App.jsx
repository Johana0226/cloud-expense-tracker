import { useState } from 'react'
import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
function App({ user, signOut }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [expenses, setExpenses] = useState([])

  const addExpense = (e) => {
    e.preventDefault()

    if (!description || !amount) return

    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
    }

    setExpenses([...expenses, newExpense])
    setDescription('')
    setAmount('')
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="app">
      <h1>Cloud Expense Tracker</h1>
      <p>Simple personal expense management application</p>
      <p>Signed in as: {user?.signInDetails?.loginId}</p>

<button onClick={signOut}>
  Sign Out
</button>
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      <h2>Total Expenses: ${total.toFixed(2)}</h2>

      <div>
        {expenses.map((expense) => (
          <p key={expense.id}>
            {expense.description} - ${expense.amount.toFixed(2)}
          </p>
        ))}
      </div>
    </div>
  )
}
export default withAuthenticator(App)