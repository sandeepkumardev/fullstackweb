from sqlalchemy import Enum

class UserRole(str, Enum):
  Owner = "owner"
  Teacher = "teacher"
  Student = "student"
