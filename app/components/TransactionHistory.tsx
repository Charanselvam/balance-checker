import { View, Text } from 'react-native';
import { Transaction } from '../types';

export default function TransactionHistory({
  transactions,
  themeStyles,
}: any) {
  return (
    <>
      <Text className={`text-xl font-bold mt-8 mb-4 ${themeStyles.text}`}>
        Transaction History
      </Text>
      {transactions.map((t: Transaction, i: number) => (
        <View key={i} className={`p-3 rounded-lg mb-2 ${themeStyles.card}`}>
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                className={`${
                  t.type === 'expense' ? 'text-red-500' : 'text-green-500'
                } font-semibold`}
              >
                {t.description}
              </Text>
              <Text className={`text-sm ${themeStyles.transactionTime}`}>
                {new Date(t.timestamp).toLocaleString()}
              </Text>
            </View>
            <Text
              className={`text-lg ${
                t.type === 'expense' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {t.type === 'expense' ? '-' : ''}₹{t.amount.toFixed(2)}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}