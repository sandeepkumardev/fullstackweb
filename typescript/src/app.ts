const add = (a: number, b: number): never => {
  throw new Error("Function not implemented.");
};

add(5, 10);

let a: number = 10;
let b: number = 20;
let c: number = a + b;

let arr1: number[] = [1, 2, 3, 4, 5];
let arr2: Array<number> = [1, 2, 3, 4, 5];

let z: number[] = [1, 2, 3];

interface User {
  id: number;
  readonly name: string;
  age: unknown;
  laptop?: string;
}

let user1: User = {
  id: 1,
  name: "John",
  age: 30.547638,
  laptop: "Dell",
};

let user2: User = {
  id: 2,
  name: "Doe",
  age: "five",
};

// user2.id = 3;

user2.name = "Jane";

if (typeof user2.age === "string") {
  console.log(user2.age.toUpperCase());
}

if (typeof user2.age === "number") {
  console.log(user2.age.toFixed(2));
}
