class Student:
  collge = "SSGT"
  total = 0

  def __init__(self, name, marks):
    self.name = name
    self.marks = marks
    Student.total += 1

  def printInfo(self):
    total = sum(self.marks)
    print(f"College: {self.collge}, Name: {self.name}, Total Marks: {total}")


s1 = Student("John", [10, 20, 30, 40, 50])
s2 = Student("John", [10, 20, 30, 40, 50])
s1.printInfo()