export interface CategoryType {
  id: number | string;
  name: string;
  img: string;
}

export interface CategoryComponentProps {
  category: CategoryType;
  onClick: (category: CategoryType) => void;
}

export interface CardType {
  id: number | string;
  img: string;
  fullname: string;
  describtion: string;
  category: string;
  price: number;
}

export interface CardComponentProps {
  card: CardType;
  onClick: (card: CardType) => void;
}
