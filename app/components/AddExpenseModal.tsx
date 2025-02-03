import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function AddExpenseModal({
  showAddForm,
  setShowAddForm,
  newExpenseName,
  setNewExpenseName,
  newExpenseAmounts,
  setNewExpenseAmounts,
  handleAddExpense,
  themeStyles,
}: any) {
  return (
    <Modal visible={showAddForm} transparent animationType="slide">
      <View className="flex-1 justify-center bg-black/50 p-4">
        <View className={`p-6 rounded-lg ${themeStyles.card}`}>
          <Text className={`text-xl font-bold mb-4 ${themeStyles.text}`}>
            New Expense Category
          </Text>
          <TextInput
            className={`p-2 mb-4 rounded-lg ${themeStyles.input}`}
            placeholder="Category Name"
            placeholderTextColor={themeStyles.inputPlaceholder}
            value={newExpenseName}
            onChangeText={setNewExpenseName}
          />
          <TextInput
            className={`p-2 mb-4 rounded-lg ${themeStyles.input}`}
            placeholder="Amounts (comma separated)"
            placeholderTextColor={themeStyles.inputPlaceholder}
            keyboardType="numeric"
            value={newExpenseAmounts}
            onChangeText={setNewExpenseAmounts}
          />
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-2 rounded-lg"
              onPress={() => setShowAddForm(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-blue-500 p-2 rounded-lg"
              onPress={handleAddExpense}
            >
              <Text className="text-white text-center">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}