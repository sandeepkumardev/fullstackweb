from datetime import datetime

class BankAccount:
    def __init__(self, name, balance):
        self.name = name
        self.__balance = balance
        self.__history = []

    def deposit(self, amount):
        self.__balance += amount
        print(f"Deposited: {amount}")
        self.__history.append(f"Date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")} --> Deposited: {amount}")

    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient balance!")
        else:
            self.__balance -= amount
            print(f"Withdrawn: {amount}")
            self.__history.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} --> Withdrawn: {amount}")

    def get_balance(self):
        return self.__balance
    
    def get_history(self):
        print(f"Transaction History: {self.name}")
        for entry in self.__history:
            print(entry)
    
    def transfer(self, other_account, amount):
        if amount > self.__balance:
            print(f"Transfer failed! {self.name} has insufficient balance.")
        else:
            self.__balance -= amount
            other_account.__balance += amount
            self.__history.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} --> {amount} Transferred to {other_account.name}")
            other_account.__history.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} --> {amount} Transferred from {self.name}")

c1 = BankAccount("Alice", 1000)
c2 = BankAccount("Bob", 2000)

c1.deposit(500)
c1.withdraw(200)

c1.transfer(c2, 100)

print(c1.get_balance())
print(c2.get_balance())

c1.get_history()
c2.get_history()