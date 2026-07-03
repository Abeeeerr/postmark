// Leaf tint from what was ordered: matcha → cactus green,
// coffee → chocolate lab, anything else → warm taupe.
const MATCHA_WORDS = ['matcha', 'hojicha', 'green tea']
const COFFEE_WORDS = [
  'coffee', 'latte', 'espresso', 'cappuccino', 'mocha', 'americano',
  'cortado', 'flat white', 'macchiato', 'affogato', 'brew', 'lungo',
  'ristretto', 'doppio', 'filter', 'pour over', 'pourover',
]

export function drinkTone(drink = '') {
  const d = drink.toLowerCase()
  if (MATCHA_WORDS.some((w) => d.includes(w))) return 'matcha'
  if (COFFEE_WORDS.some((w) => d.includes(w))) return 'coffee'
  return 'neutral'
}
