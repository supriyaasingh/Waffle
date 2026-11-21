/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WAFFLEKAR — MENU DATA (single source of truth)
 * ─────────────────────────────────────────────────────────────────────────────
 *  • Names and prices are the PUBLISHED menu values from the brief and are
 *    PROVISIONAL until the owner confirms them (`pricesConfirmed`).
 *  • Descriptions are written from the product names only; they make no
 *    claims about recipes or sourcing. Owner may rewrite freely.
 *  • `veg` is null (= not shown) until the owner confirms it.
 *  • To add an item: copy an object, give it a unique `id`, pick a category.
 *  • `photo`: path in /public (e.g. '/images/menu/kunafa.webp'). When null,
 *    the site renders an illustrated waffle using `art` instead.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const pricesConfirmed = false

export type CategoryId = 'signature' | 'chocolate' | 'fruit' | 'premium' | 'croffles' | 'beverages'

export interface Category {
  id: CategoryId
  label: string
  /** Hide a category entirely (e.g. beverages until confirmed) */
  visible: boolean
  emptyNote?: string
}

export const categories: Category[] = [
  { id: 'signature', label: 'Signature Waffles', visible: true },
  { id: 'chocolate', label: 'Chocolate Specials', visible: true },
  { id: 'fruit', label: 'Fruit & Cream', visible: true },
  { id: 'premium', label: 'Premium Specials', visible: true },
  {
    id: 'croffles',
    label: 'Croffles',
    visible: true,
    emptyNote: 'Our croffle line-up is being added to the online menu. Ask in store or call us for today’s croffles.',
  },
  { id: 'beverages', label: 'Beverages', visible: false }, // TODO(owner): enable once confirmed
]

export type Topping =
  | 'strawberry' | 'blueberry' | 'mango' | 'cookie' | 'lotus' | 'almond' | 'walnut'
  | 'brownie' | 'kunafa' | 'cream' | 'butter' | 'cheese' | 'chocchunk' | 'redvelvet' | 'honey'

export interface WaffleArt {
  /** batter / crust colour */
  base: string
  /** sauce colour */
  sauce: string
  sauceStyle: 'drizzle' | 'pool' | 'lace'
  toppings: Topping[]
}

export interface MenuItem {
  id: string
  name: string
  price: number
  category: CategoryId
  description: string
  /** short spotlight line */
  mood: string
  veg: boolean | null
  signature: boolean
  photo: string | null
  art: WaffleArt
  /** spotlight backdrop [deep, mid, glow] */
  theme: [string, string, string]
}

export const menu: MenuItem[] = [
  {
    id: 'golden-honey-butter-dream',
    name: 'Golden Honey Butter Dream',
    price: 90,
    category: 'signature',
    description: 'The golden classic — a crisp waffle finished with honey and butter.',
    mood: 'Simple. Golden. Dreamy.',
    veg: null, signature: true, photo: null,
    art: { base: '#E0A84E', sauce: '#F2B94A', sauceStyle: 'pool', toppings: ['butter', 'honey'] },
    theme: ['#3A230C', '#9A6420', '#F6C565'],
  },
  {
    id: 'nutty-brownie-overload',
    name: 'Nutty Brownie Overload',
    price: 125,
    category: 'chocolate',
    description: 'Brownie and nuts piled onto a chocolate-drenched waffle. Overload, as promised.',
    mood: 'Fudgy, nutty, unapologetic.',
    veg: null, signature: true, photo: null,
    art: { base: '#C98B3E', sauce: '#3B1A0E', sauceStyle: 'drizzle', toppings: ['brownie', 'almond', 'chocchunk'] },
    theme: ['#1C0D07', '#4A2414', '#A8653A'],
  },
  {
    id: 'biscoff-supreme-delight',
    name: 'Biscoff Supreme Delight',
    price: 125,
    category: 'premium',
    description: 'Caramelised biscuit spread and cookie crumble on a warm golden waffle.',
    mood: 'Caramel crunch in every square.',
    veg: null, signature: true, photo: null,
    art: { base: '#D49A4A', sauce: '#B8682A', sauceStyle: 'drizzle', toppings: ['cookie', 'lotus'] },
    theme: ['#2E1608', '#8A4A1E', '#E8A35A'],
  },
  {
    id: 'red-velvet-berry-delight',
    name: 'Red Velvet & Berry Delight',
    price: 125,
    category: 'fruit',
    description: 'Red velvet vibes with a berry finish — a pretty plate with a big personality.',
    mood: 'Velvet-soft and berry-bright.',
    veg: null, signature: true, photo: null,
    art: { base: '#A8323A', sauce: '#FFF3DF', sauceStyle: 'drizzle', toppings: ['redvelvet', 'strawberry', 'blueberry'] },
    theme: ['#2A0A10', '#7A1C2A', '#E85B62'],
  },
  {
    id: 'strawberry-cream-dream',
    name: 'Strawberry Cream Dream',
    price: 150,
    category: 'fruit',
    description: 'Strawberries and cream on a golden waffle — light, fresh and dreamy.',
    mood: 'Pink clouds, golden crunch.',
    veg: null, signature: true, photo: null,
    art: { base: '#DCA250', sauce: '#F7B6BC', sauceStyle: 'pool', toppings: ['cream', 'strawberry'] },
    theme: ['#3A1218', '#B4404A', '#FFC2C6'],
  },
  {
    id: 'mango-cheese-love',
    name: 'Mango Cheese Love',
    price: 150,
    category: 'fruit',
    description: 'Sunny mango meets creamy cheese on a crisp waffle.',
    mood: 'Tropical, creamy, in love.',
    veg: null, signature: true, photo: null,
    art: { base: '#DDA54E', sauce: '#FFB020', sauceStyle: 'pool', toppings: ['cheese', 'mango'] },
    theme: ['#3A2306', '#C77A0E', '#FFD166'],
  },
  {
    id: 'blueberry-cheese-cloud',
    name: 'Blueberry Cheese Cloud',
    price: 160,
    category: 'fruit',
    description: 'A soft cheese cloud swirled with blueberry on a golden waffle.',
    mood: 'Cheesecake dreams, waffle form.',
    veg: null, signature: true, photo: null,
    art: { base: '#D9A04E', sauce: '#6653A6', sauceStyle: 'drizzle', toppings: ['cheese', 'blueberry'] },
    theme: ['#140E2E', '#4A3A8A', '#A898F0'],
  },
  {
    id: 'lotus-cheese-delight',
    name: 'Lotus Cheese Delight',
    price: 200,
    category: 'premium',
    description: 'Lotus biscuit crunch and smooth cheese on a warm waffle.',
    mood: 'Spiced caramel, silky cheese.',
    veg: null, signature: true, photo: null,
    art: { base: '#D19548', sauce: '#B06A30', sauceStyle: 'pool', toppings: ['cheese', 'lotus', 'cookie'] },
    theme: ['#2A1508', '#7E4520', '#E2A066'],
  },
  {
    id: 'dark-almond-sensation',
    name: 'Dark Almond Sensation',
    price: 170,
    category: 'chocolate',
    description: 'Dark chocolate and almonds — for the serious chocolate lover.',
    mood: 'Dark, roasted, irresistible.',
    veg: null, signature: true, photo: null,
    art: { base: '#B57A36', sauce: '#24100A', sauceStyle: 'pool', toppings: ['almond', 'chocchunk'] },
    theme: ['#120806', '#36190F', '#8A5A3A'],
  },
  {
    id: 'walnut-milky-magic',
    name: 'Walnut Milky Magic',
    price: 180,
    category: 'chocolate',
    description: 'Milk chocolate and walnuts in a smooth, nutty, magic combination.',
    mood: 'Milky, nutty, magical.',
    veg: null, signature: true, photo: null,
    art: { base: '#D39A4C', sauce: '#7A4A2C', sauceStyle: 'drizzle', toppings: ['walnut', 'chocchunk'] },
    theme: ['#24120A', '#70402C', '#D4A07A'],
  },
  {
    id: 'kunafa-honey-lace',
    name: 'Kunafa Honey Lace',
    price: 210,
    category: 'premium',
    description: 'Golden kunafa crunch laced with honey — our most indulgent plate.',
    mood: 'Golden threads. Honey lace.',
    veg: null, signature: true, photo: null,
    art: { base: '#DBA24C', sauce: '#F0B43C', sauceStyle: 'lace', toppings: ['kunafa', 'honey', 'almond'] },
    theme: ['#2C1A04', '#8E5E12', '#F7CF6A'],
  },
]

export const formatPrice = (p: number) => `₹${p}`
export const itemById = (id: string) => menu.find((m) => m.id === id)
