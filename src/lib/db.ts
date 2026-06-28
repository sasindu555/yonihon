import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  Experience,
  Event,
  Guide,
  Destination,
  GuideCategory,
  AdminUser,
} from "./types";
import type { RoleDefinition, Permission } from "./permissions";

type D1Result<T> = { results: T[] };
type Row = Record<string, unknown>;

function getDB(): D1Database {
  const { env } = getCloudflareContext();
  return env.DB as D1Database;
}

function parseJSON<T>(val: string | null, fallback: T): T {
  if (!val) return fallback;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

function toEvent(row: Row): Event {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    excerpt: String(row.excerpt ?? ""),
    description: String(row.description ?? ""),
    heroImage: String(row.hero_image ?? ""),
    images: parseJSON<string[]>(String(row.images ?? "[]"), []),
    startDate: String(row.start_date ?? ""),
    endDate: String(row.end_date ?? ""),
    location: String(row.location ?? ""),
    prefecture: String(row.prefecture ?? ""),
    area: String(row.area ?? ""),
    category: String(row.category ?? ""),
    tags: parseJSON<string[]>(String(row.tags ?? "[]"), []),
    admission: String(row.admission ?? ""),
    bestFor: String(row.best_for ?? ""),
    goodFor: String(row.good_for ?? ""),
    nearestStation: String(row.nearest_station ?? ""),
    officialSite: String(row.official_site ?? ""),
    whyPeopleLoveIt: String(row.why_people_love_it ?? ""),
    tipsForVisitors: parseJSON<string[]>(String(row.tips_for_visitors ?? "[]"), []),
    highlightTitle: row.highlight_title ? String(row.highlight_title) : undefined,
  };
}

function toGuide(row: Row): Guide {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    category: String(row.category ?? ""),
    categorySlug: String(row.category_slug ?? ""),
    image: String(row.image ?? ""),
    author: String(row.author ?? ""),
    date: String(row.date ?? ""),
    readTime: String(row.read_time ?? ""),
    featured: Boolean(row.featured),
    tableOfContents: parseJSON<{ title: string; anchor: string }[]>(
      String(row.table_of_contents ?? "[]"),
      []
    ),
  };
}

function toExperience(row: Row): Experience {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    shortDescription: String(row.short_description ?? ""),
    description: String(row.description ?? ""),
    duration: String(row.duration ?? ""),
    groupSize: String(row.group_size ?? ""),
    language: String(row.language ?? ""),
    experienceType: String(row.experience_type ?? ""),
    location: String(row.location ?? ""),
    destination: String(row.destination ?? ""),
    category: String(row.category ?? ""),
    price: Number(row.price ?? 0),
    currency: String(row.currency ?? "¥"),
    image: String(row.image ?? ""),
    images: parseJSON<string[]>(String(row.images ?? "[]"), []),
    featured: Boolean(row.featured),
    popular: Boolean(row.popular),
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    meetingPoint: String(row.meeting_point ?? ""),
    cancellationPolicy: String(row.cancellation_policy ?? ""),
    highlights: parseJSON<string[]>(String(row.highlights ?? "[]"), []),
    included: parseJSON<string[]>(String(row.included ?? "[]"), []),
    notIncluded: parseJSON<string[]>(String(row.not_included ?? "[]"), []),
    itinerary: parseJSON<{ title: string; description: string }[]>(
      String(row.itinerary ?? "[]"),
      []
    ),
    hostName: String(row.host_name ?? ""),
    hostInstagram: String(row.host_instagram ?? ""),
    bookingNote: String(row.booking_note ?? ""),
  };
}

function toDestination(row: Row): Destination {
  return {
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
  };
}

function toGuideCategory(row: Row): GuideCategory {
  return {
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    icon: String(row.icon ?? ""),
    count: Number(row.count ?? 0),
  };
}

function toUser(row: Row): AdminUser {
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    password: String(row.password ?? ""),
    role: String(row.role ?? "") as AdminUser["role"],
    createdAt: String(row.created_at ?? ""),
    lastLogin: row.last_login ? String(row.last_login) : null,
    active: Boolean(row.active),
  };
}

function toRole(row: Row): RoleDefinition {
  return {
    role: String(row.role ?? ""),
    label: String(row.label ?? ""),
    permissions: parseJSON<string[]>(String(row.permissions ?? "[]"), []) as Permission[],
  };
}

export async function getEvents(): Promise<Event[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM events ORDER BY start_date DESC").all<Row>();
  return (result.results ?? []).map(toEvent);
}

export async function getEventsByTag(slug: string): Promise<Event[]> {
  const db = getDB();
  const all = await getEvents();
  return all.filter((e) =>
    e.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === slug)
  );
}

export async function getEvent(id: string): Promise<Event | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM events WHERE id = ?").bind(id).first<Row>();
  return result ? toEvent(result) : null;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM events WHERE slug = ?").bind(slug).first<Row>();
  return result ? toEvent(result) : null;
}

export async function createEvent(data: Omit<Event, "id">): Promise<Event> {
  const db = getDB();
  const id = String(Date.now());
  await db
    .prepare(
      `INSERT INTO events (id, title, slug, excerpt, description, hero_image, images, start_date, end_date, location, prefecture, area, category, tags, admission, best_for, good_for, nearest_station, official_site, why_people_love_it, tips_for_visitors, highlight_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      data.title,
      data.slug,
      data.excerpt,
      data.description,
      data.heroImage,
      JSON.stringify(data.images),
      data.startDate,
      data.endDate,
      data.location,
      data.prefecture,
      data.area,
      data.category,
      JSON.stringify(data.tags),
      data.admission,
      data.bestFor,
      data.goodFor,
      data.nearestStation,
      data.officialSite,
      data.whyPeopleLoveIt,
      JSON.stringify(data.tipsForVisitors),
      data.highlightTitle ?? null
    )
    .run();
  return { ...data, id };
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<Event | null> {
  const existing = await getEvent(id);
  if (!existing) return null;
  const merged = { ...existing, ...data };
  const db = getDB();
  await db
    .prepare(
      `UPDATE events SET title=?, slug=?, excerpt=?, description=?, hero_image=?, images=?, start_date=?, end_date=?, location=?, prefecture=?, area=?, category=?, tags=?, admission=?, best_for=?, good_for=?, nearest_station=?, official_site=?, why_people_love_it=?, tips_for_visitors=?, highlight_title=? WHERE id=?`
    )
    .bind(
      merged.title,
      merged.slug,
      merged.excerpt,
      merged.description,
      merged.heroImage,
      JSON.stringify(merged.images),
      merged.startDate,
      merged.endDate,
      merged.location,
      merged.prefecture,
      merged.area,
      merged.category,
      JSON.stringify(merged.tags),
      merged.admission,
      merged.bestFor,
      merged.goodFor,
      merged.nearestStation,
      merged.officialSite,
      merged.whyPeopleLoveIt,
      JSON.stringify(merged.tipsForVisitors),
      merged.highlightTitle ?? null,
      id
    )
    .run();
  return merged;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const db = getDB();
  const result = await db.prepare("DELETE FROM events WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}

export async function getGuides(): Promise<Guide[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM guides ORDER BY date DESC").all<Row>();
  return (result.results ?? []).map(toGuide);
}

export async function getGuide(id: string): Promise<Guide | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM guides WHERE id = ?").bind(id).first<Row>();
  return result ? toGuide(result) : null;
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM guides WHERE slug = ?").bind(slug).first<Row>();
  return result ? toGuide(result) : null;
}

export async function getGuidesByCategory(categorySlug: string): Promise<Guide[]> {
  const db = getDB();
  const result = await db
    .prepare("SELECT * FROM guides WHERE category_slug = ? ORDER BY date DESC")
    .bind(categorySlug)
    .all<Row>();
  return (result.results ?? []).map(toGuide);
}

export async function createGuide(data: Omit<Guide, "id">): Promise<Guide> {
  const db = getDB();
  const id = String(Date.now());
  await db
    .prepare(
      `INSERT INTO guides (id, title, slug, excerpt, content, category, category_slug, image, author, date, read_time, featured, table_of_contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.category,
      data.categorySlug,
      data.image,
      data.author,
      data.date,
      data.readTime,
      data.featured ? 1 : 0,
      JSON.stringify(data.tableOfContents ?? [])
    )
    .run();
  return { ...data, id };
}

export async function updateGuide(id: string, data: Partial<Guide>): Promise<Guide | null> {
  const existing = await getGuide(id);
  if (!existing) return null;
  const merged = { ...existing, ...data };
  const db = getDB();
  await db
    .prepare(
      `UPDATE guides SET title=?, slug=?, excerpt=?, content=?, category=?, category_slug=?, image=?, author=?, date=?, read_time=?, featured=?, table_of_contents=? WHERE id=?`
    )
    .bind(
      merged.title,
      merged.slug,
      merged.excerpt,
      merged.content,
      merged.category,
      merged.categorySlug,
      merged.image,
      merged.author,
      merged.date,
      merged.readTime,
      merged.featured ? 1 : 0,
      JSON.stringify(merged.tableOfContents ?? []),
      id
    )
    .run();
  return merged;
}

export async function deleteGuide(id: string): Promise<boolean> {
  const db = getDB();
  const result = await db.prepare("DELETE FROM guides WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}

export async function getExperiences(): Promise<Experience[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM experiences ORDER BY featured DESC, rating DESC").all<Row>();
  return (result.results ?? []).map(toExperience);
}

export async function getExperience(id: string): Promise<Experience | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM experiences WHERE id = ?").bind(id).first<Row>();
  return result ? toExperience(result) : null;
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM experiences WHERE slug = ?").bind(slug).first<Row>();
  return result ? toExperience(result) : null;
}

export async function createExperience(data: Omit<Experience, "id">): Promise<Experience> {
  const db = getDB();
  const id = String(Date.now());
  await db
    .prepare(
      `INSERT INTO experiences (id, title, slug, short_description, description, duration, group_size, language, experience_type, location, destination, category, price, currency, image, images, featured, popular, rating, review_count, meeting_point, cancellation_policy, highlights, included, not_included, itinerary, host_name, host_instagram, booking_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id, data.title, data.slug, data.shortDescription, data.description,
      data.duration, data.groupSize, data.language, data.experienceType,
      data.location, data.destination, data.category, data.price, data.currency,
      data.image, JSON.stringify(data.images), data.featured ? 1 : 0,
      data.popular ? 1 : 0, data.rating, data.reviewCount, data.meetingPoint,
      data.cancellationPolicy, JSON.stringify(data.highlights),
      JSON.stringify(data.included), JSON.stringify(data.notIncluded),
      JSON.stringify(data.itinerary), data.hostName, data.hostInstagram,
      data.bookingNote
    )
    .run();
  return { ...data, id };
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<Experience | null> {
  const existing = await getExperience(id);
  if (!existing) return null;
  const merged = { ...existing, ...data };
  const db = getDB();
  await db
    .prepare(
      `UPDATE experiences SET title=?, slug=?, short_description=?, description=?, duration=?, group_size=?, language=?, experience_type=?, location=?, destination=?, category=?, price=?, currency=?, image=?, images=?, featured=?, popular=?, rating=?, review_count=?, meeting_point=?, cancellation_policy=?, highlights=?, included=?, not_included=?, itinerary=?, host_name=?, host_instagram=?, booking_note=? WHERE id=?`
    )
    .bind(
      merged.title, merged.slug, merged.shortDescription, merged.description,
      merged.duration, merged.groupSize, merged.language, merged.experienceType,
      merged.location, merged.destination, merged.category, merged.price,
      merged.currency, merged.image, JSON.stringify(merged.images),
      merged.featured ? 1 : 0, merged.popular ? 1 : 0, merged.rating,
      merged.reviewCount, merged.meetingPoint, merged.cancellationPolicy,
      JSON.stringify(merged.highlights), JSON.stringify(merged.included),
      JSON.stringify(merged.notIncluded), JSON.stringify(merged.itinerary),
      merged.hostName, merged.hostInstagram, merged.bookingNote, id
    )
    .run();
  return merged;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const db = getDB();
  const result = await db.prepare("DELETE FROM experiences WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}

export async function getDestinations(): Promise<Destination[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM destinations ORDER BY name").all<Row>();
  return (result.results ?? []).map(toDestination);
}

export async function createDestination(data: Destination): Promise<Destination> {
  const db = getDB();
  await db.prepare("INSERT INTO destinations (name, slug) VALUES (?, ?)").bind(data.name, data.slug).run();
  return data;
}

export async function replaceDestinations(data: Destination[]): Promise<void> {
  const db = getDB();
  await db.batch([
    db.prepare("DELETE FROM destinations"),
    ...data.map((d) => db.prepare("INSERT INTO destinations (name, slug) VALUES (?, ?)").bind(d.name, d.slug)),
  ]);
}

export async function deleteDestinations(slugs: string[]): Promise<void> {
  const db = getDB();
  for (const slug of slugs) {
    await db.prepare("DELETE FROM destinations WHERE slug = ?").bind(slug).run();
  }
}

export async function getGuideCategories(): Promise<GuideCategory[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM guide_categories ORDER BY name").all<Row>();
  return (result.results ?? []).map(toGuideCategory);
}

export async function createGuideCategory(data: GuideCategory): Promise<GuideCategory> {
  const db = getDB();
  await db
    .prepare("INSERT INTO guide_categories (name, slug, icon, count) VALUES (?, ?, ?, ?)")
    .bind(data.name, data.slug, data.icon, data.count)
    .run();
  return data;
}

export async function replaceGuideCategories(data: GuideCategory[]): Promise<void> {
  const db = getDB();
  await db.batch([
    db.prepare("DELETE FROM guide_categories"),
    ...data.map((d) =>
      db.prepare("INSERT INTO guide_categories (name, slug, icon, count) VALUES (?, ?, ?, ?)")
        .bind(d.name, d.slug, d.icon, d.count)
    ),
  ]);
}

export async function deleteGuideCategories(slugs: string[]): Promise<void> {
  const db = getDB();
  for (const slug of slugs) {
    await db.prepare("DELETE FROM guide_categories WHERE slug = ?").bind(slug).run();
  }
}

export async function getUsers(): Promise<AdminUser[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM users ORDER BY created_at").all<Row>();
  return (result.results ?? []).map(toUser);
}

export async function getUser(id: string): Promise<AdminUser | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<Row>();
  return result ? toUser(result) : null;
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<Row>();
  return result ? toUser(result) : null;
}

export async function createUser(data: AdminUser): Promise<AdminUser> {
  const db = getDB();
  await db
    .prepare(
      "INSERT INTO users (id, name, email, password, role, created_at, last_login, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(data.id, data.name, data.email, data.password, data.role, data.createdAt, data.lastLogin, data.active ? 1 : 0)
    .run();
  return data;
}

export async function updateUser(id: string, data: Partial<AdminUser>): Promise<AdminUser | null> {
  const existing = await getUser(id);
  if (!existing) return null;
  const merged = { ...existing, ...data };
  const db = getDB();
  await db
    .prepare(
      "UPDATE users SET name=?, email=?, password=?, role=?, last_login=?, active=? WHERE id=?"
    )
    .bind(merged.name, merged.email, merged.password, merged.role, merged.lastLogin, merged.active ? 1 : 0, id)
    .run();
  return merged;
}

export async function deleteUser(id: string): Promise<boolean> {
  const db = getDB();
  const result = await db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
  return result.meta.changes > 0;
}

export async function getRoles(): Promise<RoleDefinition[]> {
  const db = getDB();
  const result = await db.prepare("SELECT * FROM roles").all<Row>();
  return (result.results ?? []).map(toRole);
}

export async function updateRoles(data: RoleDefinition[]): Promise<void> {
  const db = getDB();
  await db.batch([
    db.prepare("DELETE FROM roles"),
    ...data.map((r) =>
      db.prepare("INSERT INTO roles (role, label, permissions) VALUES (?, ?, ?)")
        .bind(r.role, r.label, JSON.stringify(r.permissions))
    ),
  ]);
}

export async function getPopularTags(): Promise<string[]> {
  const db = getDB();
  const result = await db.prepare("SELECT tag FROM popular_tags ORDER BY tag").all<{ tag: string }>();
  return (result.results ?? []).map((r) => r.tag);
}
