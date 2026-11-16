export type ProductTag = "new" | "sale" | "bestseller" | "limited";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  /** current price, Toman */
  price: number;
  /** original price before discount, Toman */
  compareAt?: number;
  tag?: ProductTag;
  stock?: number;
  colors: string[];
  fabric?: string;
  img: string;
  imgAlt: string;
  hover?: string;
}

const px = (id: number | string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800`;

export const products: Product[] = [
  // ---- new arrivals ----
  {
    id: "p01",
    slug: "shomiz-krep-nastaran",
    name: "شومیز کرپ «نسترن»",
    category: "شومیز",
    price: 1490000,
    tag: "new",
    colors: ["#e9e4dc", "#171717", "#540d18"],
    fabric: "کرپ ابریشم",
    img: px(31132019),
    imgAlt: "مدل با شومیز کرپ روشن در فضای مینیمال",
    hover: px(34105295),
  },
  {
    id: "p02",
    slug: "kot-pashmi-mehrin",
    name: "کت بلند پشمی «مهرین»",
    category: "کت و پالتو",
    price: 3650000,
    tag: "new",
    colors: ["#c9b8a3", "#171717"],
    fabric: "پشم مرینوس",
    img: px(33724870),
    imgAlt: "مدل با ترنچ‌کت بژ و بوت در فضای داخلی",
    hover: px(7760026),
  },
  {
    id: "p03",
    slug: "top-rib-taranom",
    name: "تاپ ریب «ترنم»",
    category: "تاپ و تی‌شرت",
    price: 790000,
    tag: "new",
    colors: ["#171717", "#f6f3ee", "#a69d93"],
    fabric: "ریب پنبه",
    img: px(33785312),
    imgAlt: "مدل با تاپ و ژاکت مشکی در پس‌زمینه خنثی",
    hover: px(19169278),
  },
  {
    id: "p04",
    slug: "shalvar-plise-baharak",
    name: "شلوار پلیسه «بهارک»",
    category: "شلوار",
    price: 1690000,
    tag: "new",
    colors: ["#171717", "#8a7d70"],
    fabric: "کرپ پلیسه",
    img: px(19222080),
    imgAlt: "مدل با استایل مینیمال در استودیو",
    hover: px(20578718),
  },
  // ---- special offers ----
  {
    id: "p05",
    slug: "palto-oversize-baran",
    name: "پالتو اورسایز «باران»",
    category: "کت و پالتو",
    price: 3430000,
    compareAt: 4900000,
    tag: "sale",
    colors: ["#d9cfc0", "#171717"],
    fabric: "پشم دو رو",
    img: px(19445634),
    imgAlt: "مدل با پالتو بژ در نور استودیو",
    hover: px(19445637),
  },
  {
    id: "p06",
    slug: "shomiz-sefid-negin",
    name: "شومیز کلاسیک «نگین»",
    category: "شومیز",
    price: 1155000,
    compareAt: 1650000,
    tag: "sale",
    colors: ["#f6f3ee", "#171717"],
    fabric: "پوبلین نخ",
    img: px(8958834),
    imgAlt: "مدل با بلیزر مشکی و تاپ سفید",
    hover: px(34691206),
  },
  {
    id: "p07",
    slug: "set-dootike-samira",
    name: "ست دو تیکه «سمیرا»",
    category: "ست لباس",
    price: 2400000,
    compareAt: 3200000,
    tag: "sale",
    colors: ["#ded6c9", "#540d18"],
    fabric: "لینن شسته‌شده",
    img: px(20578709),
    imgAlt: "مدل با کت روشن و آینه در پس‌زمینه مینیمال",
    hover: px(20578718),
  },
  {
    id: "p08",
    slug: "manto-katan-raana",
    name: "مانتو کتان «رعنا»",
    category: "مانتو سبک",
    price: 1715000,
    compareAt: 2450000,
    tag: "sale",
    colors: ["#e9e4dc", "#3c3a38"],
    fabric: "کتان بافت",
    img: px(19112765),
    imgAlt: "مدل با مانتوی بژ در خیابان شهر",
    hover: px(19299199),
  },
  // ---- limited stock ----
  {
    id: "p09",
    slug: "kot-jeer-hesti",
    name: "کت جیر «هستی»",
    category: "کت",
    price: 2890000,
    tag: "limited",
    stock: 3,
    colors: ["#7a5b45", "#171717"],
    fabric: "جیر مصنوعی",
    img: px(16115837),
    imgAlt: "مدل با کت قهوه‌ای و کلاه در فضای شهری",
    hover: px(16115838),
  },
  {
    id: "p10",
    slug: "shomiz-abrisham-yasmin",
    name: "شومیز ابریشم «یاسمین»",
    category: "شومیز",
    price: 2190000,
    tag: "limited",
    stock: 2,
    colors: ["#e9e4dc"],
    fabric: "ابریشم طبیعی",
    img: px(6726841),
    imgAlt: "مدل با کت بلند در چرخش روی پس‌زمینه تیره",
    hover: px(16564573),
  },
  {
    id: "p11",
    slug: "tishert-supima-nila",
    name: "تی‌شرت سوپیما «نیلا»",
    category: "تاپ و تی‌شرت",
    price: 890000,
    tag: "limited",
    stock: 5,
    colors: ["#ead24c", "#f6f3ee"],
    fabric: "پنبه سوپیما",
    img: px(1427702),
    imgAlt: "مدل با مانتوی زرد در فضای باز",
    hover: px(19141882),
  },
  // ---- best sellers ----
  {
    id: "p12",
    slug: "shomiz-classic-azin",
    name: "شومیز کلاسیک «آذین»",
    category: "شومیز",
    price: 1290000,
    tag: "bestseller",
    colors: ["#171717", "#f6f3ee"],
    fabric: "مودال",
    img: px(34094489),
    imgAlt: "مدل با استایل مشکی تکیه به دیوار سفید",
    hover: px(33785312),
  },
  {
    id: "p13",
    slug: "palto-boland-paeez",
    name: "پالتو بلند «پاییز»",
    category: "کت و پالتو",
    price: 4250000,
    tag: "bestseller",
    colors: ["#c9b8a3", "#540d18"],
    fabric: "پشم و کاشمیر",
    img: px(19141882),
    imgAlt: "مدل با پالتو روشن در محیط شهری",
    hover: px(16115838),
  },
  {
    id: "p14",
    slug: "kot-blazer-sahra",
    name: "کت بلیزر «صحرا»",
    category: "کت",
    price: 2780000,
    tag: "bestseller",
    colors: ["#a69d93", "#171717"],
    fabric: "ویسکوز کتان",
    img: px(34094493),
    imgAlt: "مدل با ست روشن در اتاق سفید مینیمال",
    hover: px(34105295),
  },
  {
    id: "p15",
    slug: "manto-havades-tala",
    name: "مانتو دکمه‌دار «طلا»",
    category: "مانتو سبک",
    price: 1980000,
    tag: "bestseller",
    colors: ["#3c3a38", "#e9e4dc"],
    fabric: "ترگال سبک",
    img: px(34691206),
    imgAlt: "پرتره سیاه‌وسفید مدل با بلیزر اورسایز",
    hover: px(20578709),
  },
  {
    id: "p16",
    slug: "shalvar-palazo-mira",
    name: "شلوار پالازو «میرا»",
    category: "شلوار",
    price: 1540000,
    colors: ["#171717", "#8a7d70"],
    fabric: "کرپ مازراتی",
    img: px(39202950),
    imgAlt: "مدل نشسته با پیراهن قهوه‌ای روی صندلی",
    hover: px(7760026),
  },
];

export const byId = (id: string) => products.find((p) => p.id === id)!;

export const newArrivals = ["p01", "p02", "p03", "p04"].map(byId);
export const specialOffers = ["p05", "p06", "p07", "p08"].map(byId);
export const limitedStock = ["p09", "p10", "p11"].map(byId);
export const bestSellers = ["p12", "p13", "p14", "p16"].map(byId);
export const editorPicks = ["p02", "p06", "p15"].map(byId);

export interface Category {
  id: string;
  title: string;
  latin: string;
  img: string;
  span: "wide" | "tall" | "box";
}

export const categories: Category[] = [
  {
    id: "blouse",
    title: "شومیز",
    latin: "Blouses",
    img: px(34105295),
    span: "wide",
  },
  {
    id: "trousers",
    title: "شلوار",
    latin: "Trousers",
    img: px(7760026),
    span: "tall",
  },
  {
    id: "tops",
    title: "تاپ و تی‌شرت",
    latin: "Tops & Tees",
    img: px(34094489),
    span: "box",
  },
  {
    id: "coats",
    title: "کت و پالتو",
    latin: "Coats & Jackets",
    img: px(21050506),
    span: "wide",
  },
  {
    id: "scarf",
    title: "روسری",
    latin: "Scarves",
    img: px(33722977),
    span: "box",
  },
  {
    id: "sets",
    title: "ست لباس",
    latin: "Sets",
    img: px(17040863),
    span: "box",
  },
];
