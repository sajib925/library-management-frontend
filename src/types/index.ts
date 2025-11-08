export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  image?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface Borrow {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
  };
  quantity: number;          
  borrowedDate: string;      
  returnDate: string;       
  returned: boolean;         
}

