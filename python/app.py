def deco(func):
  def wrapper():
    print("start")
    func()
    print("end")

  return wrapper

@deco
def hello():
  print("hello world")

@deco
def world():
  print("world")

world()

hello()

