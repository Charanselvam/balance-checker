import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function InitialBalanceScreen({
  tempBalance,
  setTempBalance,
  handleSetBalance,
  themeStyles,
}: any) {
  return (
    <View className={`flex-1 justify-center p-4 ${themeStyles.bg}`}>
      <Text className={`text-2xl mb-4 text-center ${themeStyles.text}`}>
        Set Initial Balance
      </Text>
      <TextInput
        className={`p-4 rounded-lg mb-4 ${themeStyles.input}`}
        placeholder="Enter amount"
        placeholderTextColor={themeStyles.inputPlaceholder}
        keyboardType="numeric"
        value={tempBalance}
        onChangeText={setTempBalance}
      />
      <TouchableOpacity
        className={`p-4 rounded-lg ${themeStyles.button}`}
        onPress={handleSetBalance}
      >
        <Text className="text-white text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}