import { FaCircleNotch } from "react-icons/fa";
import {
  MdAcUnit,
  MdAir,
  MdBugReport,
  MdCropSquare,
  MdFlashOn,
  MdNightsStay,
  MdRemoveRedEye,
  MdShield,
  MdTerrain,
} from "react-icons/md";
import { PiSwordFill } from "react-icons/pi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { FaGhost, FaLeaf } from "react-icons/fa";
import { FaSkullCrossbones, FaWandMagicSparkles } from "react-icons/fa6";
import { GiDragonHead } from "react-icons/gi";
import { IconType } from "react-icons";

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

const typeIcons: Record<PokemonType, IconType> = {
  normal: FaCircleNotch,
  fire: FaFireFlameCurved,
  water: GiWaterDrop,
  electric: MdFlashOn,
  grass: FaLeaf,
  ice: MdAcUnit,
  fighting: PiSwordFill,
  poison: FaSkullCrossbones,
  ground: MdTerrain,
  flying: MdAir,
  psychic: MdRemoveRedEye,
  bug: MdBugReport,
  rock: MdCropSquare,
  ghost: FaGhost,
  dragon: GiDragonHead,
  dark: MdNightsStay,
  steel: MdShield,
  fairy: FaWandMagicSparkles,
};

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export { typeColors, typeIcons };
