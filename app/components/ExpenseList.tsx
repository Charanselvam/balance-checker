import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Expense } from "../types";

export default function ExpenseList({
  expenses,
  handleDeleteExpense,
  setSelectedExpense,
  themeStyles,
}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);

  const showDeleteModal = (id: string) => {
    setSelectedExpenseId(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedExpenseId) {
      handleDeleteExpense(selectedExpenseId);
    }
    setModalVisible(false);
  };

  return (
    <ScrollView className="p-4">
      <Text className={`text-xl font-bold mb-4 ${themeStyles.text}`}>
        Expense Categories
      </Text>
      <View className="flex-col space-y-4">
        {expenses.map((expense: Expense) => (
          <View key={expense.id} className="w-full mb-6">
            <TouchableOpacity
              className={`p-4 rounded-lg items-center ${themeStyles.card}`}
              onPress={() => setSelectedExpense(expense)}
            >
              <Text className={`text-lg font-semibold ${themeStyles.text}`}>
                {expense.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-b"
              onPress={() => showDeleteModal(expense.id)}
            >
              <Text className="text-white text-center">Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Custom Modal for Delete Confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`${themeStyles.card} p-6 rounded-lg w-3/4`}>
            <Text className={`text-xl font-bold mb-4 ${themeStyles.text}`}>Delete Expense</Text>
            <Text className={`mb-4 ${themeStyles.text}`}>Are you sure you want to delete this expense?</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg"
                onPress={confirmDelete}
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
