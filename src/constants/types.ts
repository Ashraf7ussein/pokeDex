// Import image assets
import darkness from "../assets/darkness.png";
import lightning from "../assets/lightning.png";
import energyWhite from "../assets/energyWhite.png";
import fairy from "../assets/fairy.png";
import fighting from "../assets/fighting.png";
import fire from "../assets/fire.png";
import grass from "../assets/grass.png";
import psychic from "../assets/psychic.png";
import water from "../assets/water.png";
import steel from "../assets/steel.png";

// Define the supported Pokémon types
export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "lightning"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "dark"
  | "steel"
  | "fairy";

const typeIcons: Record<PokemonType, string> = {
  normal: energyWhite,
  fire,
  water,
  lightning,
  grass,
  fighting,
  psychic,
  dark: darkness,
  steel,
  fairy,
  ice: energyWhite,
  poison: energyWhite,
  ground: energyWhite,
  flying: energyWhite,
};

const typeColors: Record<PokemonType, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  lightning: "#F7D02C",
  grass: "#7AC74C",
  fighting: "#C22E28",
  psychic: "#F95587",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
  ice: "#96D9D6",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
};

export { typeIcons, typeColors };
