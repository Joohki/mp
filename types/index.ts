export interface IProduct {
    id: string;
    brand: string;
    category: string;
    desc: string;
    imageURL: string;
    name: string;
    price: number;
}

export interface IShippingAddress {
    city: string;
    line: string;
    name: string;
    postalCode: string;
}

export interface ICartItem {
    id: string;
    brand: string;
    category: string;
    desc: string;
    imageURL: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice:number;
}


export interface IOrder {
    id: string;
    orderAmount: number;
    orderDate: string;
    orderStatus: string;
    orderTime: string;
    userEmail: string;
    userID: string;
    cartItems: ICartItem[];
    shippingAddress: IShippingAddress;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
}


export interface ListPaginationProps {
    lists: any[]; // lists 배열의 타입에 따라 수정
    setLists: React.Dispatch<React.SetStateAction<any[]>>; // setLists의 타입에 따라 수정
    limit: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    blockNum: number;
    setBlockNum: React.Dispatch<React.SetStateAction<number>>;
    counts: number;
    visibleLists: any[]; // visibleLists 배열의 타입에 따라 수정
    setVisibleLists: React.Dispatch<React.SetStateAction<any[]>>; // setVisibleLists의 타입에 따라 수정
  }

  export interface INotificationData {
    status: string;
    title: string;
    message: string;
  }