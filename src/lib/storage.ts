import fs from "fs";
import path from "path";
import {
  experiences as seedExperiences,
  events as seedEvents,
  guides as seedGuides,
  destinations as seedDestinations,
  guideCategories as seedGuideCategories,
  popularTags as seedPopularTags,
} from "./data";
import { seedUsers, getDefaultPassword } from "./seed-users";
import { hashPassword } from "./hash";
import { DEFAULT_ROLES } from "./permissions";

const DATA_DIR = path.join(process.cwd(), "src", "lib", "data-files");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(collection: string): string {
  return path.join(DATA_DIR, `${collection}.json`);
}

export function readCollection<T>(collection: string): T[] {
  ensureDir();
  const fp = filePath(collection);
  if (!fs.existsSync(fp)) {
    const seed = getSeedData(collection) as T[];
    writeCollection(collection, seed);
    return seed;
  }
  const raw = fs.readFileSync(fp, "utf-8");
  return JSON.parse(raw);
}

export function writeCollection<T>(collection: string, data: T[]): void {
  ensureDir();
  fs.writeFileSync(filePath(collection), JSON.stringify(data, null, 2), "utf-8");
}

function getSeedData(collection: string): unknown[] {
  switch (collection) {
    case "experiences": return seedExperiences;
    case "events": return seedEvents;
    case "guides": return seedGuides;
    case "destinations": return seedDestinations;
    case "guideCategories": return seedGuideCategories;
    case "popularTags": return seedPopularTags;
    case "users":
      return seedUsers.map((u) => ({
        ...u,
        password: hashPassword(getDefaultPassword(u.email)),
      }));
    case "roles":
      return DEFAULT_ROLES;
    default: return [];
  }
}
