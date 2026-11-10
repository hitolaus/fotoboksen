import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { describe, expect, it } from 'vitest';
import { CardStore, type CardRecord } from '../src/store';

const card = (number: number, extra: Partial<CardRecord> = {}): CardRecord => ({
  number,
  createdAt: 1_700_000_000_000 + number,
  type: 'ild',
  effect: 'normal',
  power: 'Superhop',
  strength: 500,
  image: new Blob([`jpeg-${number}`], { type: 'image/jpeg' }),
  ...extra,
});

const fresh = () => CardStore.open(new IDBFactory());

describe('CardStore', () => {
  it('starts at card number 1 when the gallery is empty', async () => {
    const s = await fresh();
    expect(await s.nextNumber()).toBe(1);
    expect(await s.count()).toBe(0);
    expect(await s.list()).toEqual([]);
  });

  it('keeps every card with its photo and lists the newest first', async () => {
    const s = await fresh();
    await s.add(card(1));
    await s.add(card(2, { power: 'Turbo-dans', type: 'galakse', effect: 'holo' }));
    const list = await s.list();
    expect(list.map((c) => c.number)).toEqual([2, 1]);
    expect(list[0]).toMatchObject({ power: 'Turbo-dans', type: 'galakse', effect: 'holo' });
    expect(await list[0].image.text()).toBe('jpeg-2');
    expect(await s.count()).toBe(2);
  });

  it('numbers the next card after the highest one, even when an earlier card was deleted', async () => {
    const s = await fresh();
    await s.add(card(1));
    await s.add(card(2));
    await s.add(card(3));
    await s.remove(2);
    expect(await s.nextNumber()).toBe(4);
    expect((await s.list()).map((c) => c.number)).toEqual([3, 1]);
  });

  it('refuses a second card with the same number instead of overwriting a photo', async () => {
    const s = await fresh();
    await s.add(card(1));
    await expect(s.add(card(1))).rejects.toBeTruthy();
    expect(await (await s.list())[0].image.text()).toBe('jpeg-1');
  });

  it('survives closing and reopening (a reload during the party)', async () => {
    const factory = new IDBFactory();
    const a = await CardStore.open(factory);
    await a.add(card(1));
    a.close();
    const b = await CardStore.open(factory);
    expect(await b.count()).toBe(1);
  });
});
