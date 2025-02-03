import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({
  balance,
  themeStyles,
  toggleDarkMode,
  setShowBalanceForm,
  handleClearStorage,
}: any) {
  return (
    <View className={`mt-10 p-4 ${themeStyles.header}`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-2xl">Current Balance</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <MaterialIcons
            name={themeStyles.darkModeIcon}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-white text-4xl mt-2">₹{balance.toFixed(2)}</Text>
      <View className="flex-row justify-center gap-4 mt-4">
        <TouchableOpacity
          className="bg-yellow-500 px-4 py-2 rounded-lg active:bg-yellow-600"
          onPress={() => setShowBalanceForm(true)}
        >
          <Text className="text-white font-semibold">Update Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg active:bg-red-600"
          onPress={handleClearStorage}
        >
          <Text className="text-white font-semibold">Clear Storage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
