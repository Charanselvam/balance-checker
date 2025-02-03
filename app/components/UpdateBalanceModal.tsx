import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export default function UpdateBalanceModal({
  showBalanceForm,
  setShowBalanceForm,
  tempBalance,
  setTempBalance,
  handleAddToBalance,
  handleSetNewBalance,
  themeStyles,
}: any) {
  return (
    <Modal visible={showBalanceForm} transparent>
      <View className="flex-1 justify-center bg-black/50 p-4">
        <View className={`p-6 rounded-lg ${themeStyles.card}`}>
          <Text className={`text-xl font-bold mb-4 ${themeStyles.text}`}>
            Update Balance
          </Text>
          <TextInput
            className={`p-2 mb-4 rounded-lg ${themeStyles.input}`}
            placeholder="Enter amount"
            placeholderTextColor={themeStyles.inputPlaceholder}
            keyboardType="numeric"
            value={tempBalance}
            onChangeText={setTempBalance}
          />
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-2 rounded-lg"
              onPress={() => setShowBalanceForm(false)}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-green-500 p-2 rounded-lg"
              onPress={handleAddToBalance}
            >
              <Text className="text-white text-center">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-blue-500 p-2 rounded-lg"
              onPress={handleSetNewBalance}
            >
              <Text className="text-white text-center">Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}