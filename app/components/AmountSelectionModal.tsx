import { View, Text, TouchableOpacity, Modal } from 'react-native';

export default function AmountSelectionModal({
  selectedExpense,
  setSelectedExpense,
  handleDeductBalance,
  themeStyles,
}: any) {
  return (
    <Modal visible={!!selectedExpense} transparent animationType="slide">
      <View className="flex-1 justify-center bg-black/50 p-4">
        <View className={`p-6 rounded-lg ${themeStyles.card}`}>
          <Text className={`text-xl font-bold mb-4 ${themeStyles.text}`}>
            {selectedExpense?.name}
          </Text>
          <View className="flex-row flex-wrap justify-center items-center gap-2">
            {selectedExpense?.amounts.map((amount: number, i: number) => (
              <TouchableOpacity
                key={i}
                className="bg-blue-500 px-4 py-2 rounded-lg shadow-md"
                onPress={() => handleDeductBalance(amount)}
              >
                <Text className="text-white font-bold text-center">₹{amount.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            className="bg-gray-200 p-2 rounded-lg mt-4"
            onPress={() => setSelectedExpense(null)}
          >
            <Text className="text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}