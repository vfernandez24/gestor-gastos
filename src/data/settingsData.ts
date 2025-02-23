export interface Category {
  id: number;
  name: string;
  type: "ingreso" | "gasto";
  icon: string;
  color: string;
  amount: number;
}

export interface Transaction {
  id: number;
  amount: number;
  type: "ingreso" | "gasto" | "";
  date: string; //! YYYY-MM-DD
  category: number;
  description: string;
}

export interface Settings {
  saldo: number;
  ingresos: number;
  gastos: number;
  divisa: string;
  idioma: string;
  tema: "light" | "dark";
  userName: string;
  color: string;
  colorDark: string;
  formatoFecha: string;
  pinActive: boolean;
  pin: string;
  notificaciones: boolean;
  recordatorios: boolean;
}

export const initialCategories: Category[] = [
  {
    id: 0,
    name: "Hogar",
    type: "gasto",
    icon: "fa-solid fa-house",
    color: "#FFB4A2",
    amount: 0,
  },
  {
    id: 1,
    name: "Alimentación",
    type: "gasto",
    icon: "fa-solid fa-utensils",
    color: "#FFD166",
    amount: 0,
  },
  {
    id: 2,
    name: "Transporte",
    type: "gasto",
    icon: "fa-solid fa-car",
    color: "#A5D8FF",
    amount: 0,
  },
  {
    id: 3,
    name: "Salud",
    type: "gasto",
    icon: "fa-solid fa-heart-pulse",
    color: "#FFADAD",
    amount: 0,
  },
  {
    id: 4,
    name: "Educación",
    type: "gasto",
    icon: "fa-solid fa-book",
    color: "#B9FBC0",
    amount: 0,
  },
  {
    id: 5,
    name: "Entretenimiento",
    type: "gasto",
    icon: "fa-solid fa-gamepad",
    color: "#BDB2FF",
    amount: 0,
  },
  {
    id: 6,
    name: "Finanzas personales",
    type: "gasto",
    icon: "fa-solid fa-piggy-bank",
    color: "#FFDAC1",
    amount: 0,
  },
  {
    id: 7,
    name: "Ropa",
    type: "gasto",
    icon: "fa-solid fa-tshirt",
    color: "#FFCBF2",
    amount: 0,
  },
  {
    id: 8,
    name: "Otros",
    type: "gasto",
    icon: "fa-solid fa-question-circle",
    color: "#C4FAF8",
    amount: 0,
  },
  {
    id: 9,
    name: "Salario",
    type: "ingreso",
    icon: "fa-solid fa-briefcase",
    color: "#9BF6FF",
    amount: 0,
  },
  {
    id: 10,
    name: "Bonificaciones",
    type: "ingreso",
    icon: "fa-solid fa-award",
    color: "#FFC6FF",
    amount: 0,
  },
  {
    id: 11,
    name: "Trabajo independiente",
    type: "ingreso",
    icon: "fa-solid fa-laptop",
    color: "#A0C4FF",
    amount: 0,
  },
  {
    id: 12,
    name: "Comisiones",
    type: "ingreso",
    icon: "fa-solid fa-chart-line",
    color: "#FDFFB6",
    amount: 0,
  },
  {
    id: 13,
    name: "Inversiones",
    type: "ingreso",
    icon: "fa-solid fa-chart-pie",
    color: "#CAFFBF",
    amount: 0,
  },
  {
    id: 14,
    name: "Subvenciones o ayudas",
    type: "ingreso",
    icon: "fa-solid fa-hand-holding-dollar",
    color: "#E0AFFF",
    amount: 0,
  },
  {
    id: 15,
    name: "Ventas",
    type: "ingreso",
    icon: "fa-solid fa-shopping-bag",
    color: "#FFE69A",
    amount: 0,
  },
  {
    id: 16,
    name: "Regalos o donaciones",
    type: "ingreso",
    icon: "fa-solid fa-gift",
    color: "#FFABAB",
    amount: 0,
  },
  {
    id: 17,
    name: "Otros",
    type: "ingreso",
    icon: "fa-solid fa-question-circle",
    color: "#A2D2FF",
    amount: 0,
  },
];

export const initialTransactions: Transaction[] = [
];

export const initialSettings: Settings = {
  userName: "",
  saldo: 0,
  ingresos: 0,
  gastos: 0,
  divisa: "EUR",
  tema: "light",
  idioma: "es",
  color: "#4d8350",
  colorDark: "#72bb75",
  formatoFecha: "DD/MM/AAAA",
  notificaciones: true,
  recordatorios: false,
  pin: "1234",
  pinActive: false,
};
