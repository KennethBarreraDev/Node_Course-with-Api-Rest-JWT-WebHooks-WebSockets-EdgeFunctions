import { heroes } from "./data/heroes"

const findHeroeById = (id: number)=>{
  const foundHero = heroes.find((hero)=>hero.id===id)
  return foundHero
}

const hero = findHeroeById(2)

console.log(hero?.name ?? "Hero not found");
