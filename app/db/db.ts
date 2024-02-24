import Dexie, { type Table } from "dexie"
import { type DoneData } from "../types"

export class Db extends Dexie {
  dones!: Table<DoneData>

  constructor() {
    super("xdev")
    this.version(1).stores({
      dones: "id, date, userId",
    })
  }
}

export const db = new Db()
