//
// Base Types
//

export interface BookItem {
  id: number,
  name: string,
  isbn: string,
  price: number,
}

export interface UserPayload {
  id: number,
  age: number,
  name: string,
}

//
// Modules: State Types
//

export type UserState = {
} & UserPayload;

export interface BooksState {
  items: BookItem[],
  loading: boolean,
}

export interface LazyState {
  value: number,
}

//
// Root State
//
export interface RootState {
  user: UserState,
  book: BooksState,
  lazy: LazyState,

  [key: string]: any,
}
