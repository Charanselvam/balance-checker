export interface Expense {
    id: string;
    name: string;
    amounts: number[];
  }
  
  export interface Transaction {
    type: 'expense' | 'update';
    amount: number;
    description: string;
    timestamp: string;
  }