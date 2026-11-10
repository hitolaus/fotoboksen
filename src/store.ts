import type { EffectId } from './effects';
import type { CardTypeId } from './cardTypes';

export interface CardRecord {
  number: number;
  createdAt: number;
  type: CardTypeId;
  effect: EffectId;
  power: string;
  strength: number;
  image: Blob;
}

const DB_NAME = 'fotoboksen';
const STORE = 'cards';

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Local gallery of finished cards, keyed by card number. Nothing ever leaves the device. */
export class CardStore {
  private constructor(private db: IDBDatabase) {}

  static async open(factory: IDBFactory = indexedDB): Promise<CardStore> {
    const req = factory.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'number' });
    return new CardStore(await request(req));
  }

  private store(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(STORE, mode).objectStore(STORE);
  }

  /** One more than the highest card number so far; numbers never repeat while later cards exist. */
  async nextNumber(): Promise<number> {
    const cursor = await request(this.store('readonly').openCursor(null, 'prev'));
    return cursor ? (cursor.key as number) + 1 : 1;
  }

  async add(card: CardRecord): Promise<void> {
    await request(this.store('readwrite').add(card));
  }

  /** Newest first. */
  async list(): Promise<CardRecord[]> {
    const all = await request(this.store('readonly').getAll());
    return (all as CardRecord[]).sort((a, b) => b.number - a.number);
  }

  async count(): Promise<number> {
    return request(this.store('readonly').count());
  }

  async remove(number: number): Promise<void> {
    await request(this.store('readwrite').delete(number));
  }

  close(): void {
    this.db.close();
  }
}
