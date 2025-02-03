import { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Transaction } from './types';
import InitialBalanceScreen from './components/InitialBalanceScreen';
import Header from './components/Header';
import ExpenseList from './components/ExpenseList';
import TransactionHistory from './components/TransactionHistory';
import AddExpenseModal from './components/AddExpenseModal';
import AmountSelectionModal from './components/AmountSelectionModal';
import UpdateBalanceModal from './components/UpdateBalanceModal';


export default function Index() {
  const [balance, setBalance] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showInitial, setShowInitial] = useState(true);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmounts, setNewExpenseAmounts] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [tempBalance, setTempBalance] = useState('');
  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedBalance, savedExpenses, savedTransactions, savedTheme] = await Promise.all([
          AsyncStorage.getItem('balance'),
          AsyncStorage.getItem('expenses'),
          AsyncStorage.getItem('transactions'),
          AsyncStorage.getItem('theme'),
        ]);

        if (savedBalance) {
          setBalance(parseFloat(savedBalance));
          setShowInitial(false);
        }
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        if (savedTheme) setIsDarkMode(savedTheme === 'dark');
      } catch (error) {
        console.error('Loading error:', error);
      }
    };
    loadData();
  }, []);

  // Save data when changes occur
  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          AsyncStorage.setItem('balance', balance.toString()),
          AsyncStorage.setItem('expenses', JSON.stringify(expenses)),
          AsyncStorage.setItem('transactions', JSON.stringify(transactions)),
          AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light'),
        ]);
      } catch (error) {
        console.error('Saving error:', error);
      }
    };
    saveData();
  }, [balance, expenses, transactions, isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Theme-based styles
  const themeStyles = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    card: isDarkMode ? 'bg-gray-800' : 'bg-white',
    input: isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900',
    button: isDarkMode ? 'bg-blue-600' : 'bg-blue-500',
    header: isDarkMode ? 'bg-green-800' : 'bg-green-500',
    inputPlaceholder: isDarkMode ? '#a1a1aa' : '#6b7280',
    darkModeIcon: isDarkMode ? 'light-mode' : 'dark-mode',
    transactionTime: isDarkMode ? 'text-gray-400' : 'text-gray-600',
  };

  // Initial balance setup
  const handleSetBalance = async () => {
    const amount = parseFloat(tempBalance);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid balance');
      return;
    }

    setBalance(amount);
    setTransactions([{
      type: 'update',
      amount: amount,
      description: 'Initial balance set',
      timestamp: new Date().toISOString(),
    }]);
    setShowInitial(false);
  };

  // Add new expense
  const handleAddExpense = () => {
    const amounts = newExpenseAmounts.split(',')
      .map(a => parseFloat(a.trim()))
      .filter(a => !isNaN(a) && a > 0);

    if (!newExpenseName.trim() || amounts.length === 0) {
      Alert.alert('Error', 'Please enter valid name and amounts');
      return;
    }

    const newExpense: Expense = {
      id: Math.random().toString(),
      name: newExpenseName.trim(),
      amounts,
    };

    setExpenses([...expenses, newExpense]);
    setNewExpenseName('');
    setNewExpenseAmounts('');
    setShowAddForm(false);
  };

  // Delete expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Handle balance deduction
  const handleDeductBalance = (amount: number) => {
    if (!selectedExpense) return;

    if (balance < amount) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    const newBalance = balance - amount;
    setBalance(newBalance);
    setTransactions([{
      type: 'expense',
      amount: amount,
      description: selectedExpense.name,
      timestamp: new Date().toISOString(),
    }, ...transactions]);

    setSelectedExpense(null);
  };

  // Update balance
  const handleSetNewBalance = () => {
    const amount = parseFloat(tempBalance);
    if (isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const difference = amount - balance;
    setBalance(amount);
    setTransactions([{
      type: 'update',
      amount: amount,
      description: `Balance updated (${difference >= 0 ? '+' : ''}${difference.toFixed(2)})`,
      timestamp: new Date().toISOString(),
    }, ...transactions]);
    setShowBalanceForm(false);
    setTempBalance('');
  };

  // Add to balance
  const handleAddToBalance = () => {
    const amount = parseFloat(tempBalance);
    if (isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }



    const newBalance = balance + amount;
    setBalance(newBalance);
    setTransactions([{
      type: 'update',
      amount: newBalance,
      description: `Balance added +${amount.toFixed(2)}`,
      timestamp: new Date().toISOString(),
    }, ...transactions]);
    setShowBalanceForm(false);
    setTempBalance('');
  };

  if (showInitial) {
    return (
      <InitialBalanceScreen
        tempBalance={tempBalance}
        setTempBalance={setTempBalance}
        handleSetBalance={handleSetBalance}
        themeStyles={themeStyles}
      />
    );
  }

  return (
    <View className={`flex-1 ${themeStyles.bg}`}>
      <Header
        balance={balance}
        themeStyles={themeStyles}
        toggleDarkMode={toggleDarkMode}
        setShowBalanceForm={setShowBalanceForm}
        handleClearStorage={async () => {
          await AsyncStorage.clear();
          Alert.alert('Storage Cleared', 'All data has been reset');
        }}
      />

      <ScrollView className="p-4">
        <ExpenseList
          expenses={expenses}
          handleDeleteExpense={handleDeleteExpense}
          setSelectedExpense={setSelectedExpense}
          themeStyles={themeStyles}
        />

        <TransactionHistory
          transactions={transactions}
          themeStyles={themeStyles}
        />
      </ScrollView>

      {/* Add Expense Button */}
      {!showAddForm && (
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-blue-500 p-5 rounded-full shadow-lg"
          onPress={() => setShowAddForm(true)}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}

      <AddExpenseModal
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newExpenseName={newExpenseName}
        setNewExpenseName={setNewExpenseName}
        newExpenseAmounts={newExpenseAmounts}
        setNewExpenseAmounts={setNewExpenseAmounts}
        handleAddExpense={handleAddExpense}
        themeStyles={themeStyles}
      />

      <AmountSelectionModal
        selectedExpense={selectedExpense}
        setSelectedExpense={setSelectedExpense}
        handleDeductBalance={handleDeductBalance}
        themeStyles={themeStyles}
      />

      <UpdateBalanceModal
        showBalanceForm={showBalanceForm}
        setShowBalanceForm={setShowBalanceForm}
        tempBalance={tempBalance}
        setTempBalance={setTempBalance}
        handleAddToBalance={handleAddToBalance}
        handleSetNewBalance={handleSetNewBalance}
        themeStyles={themeStyles}
      />
    </View>
  );
}