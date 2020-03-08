import db from '@/utils/db'

const MAX_ID = 'MAX_ID'

let id: number = parseInt(db.get(MAX_ID) || '0')

function createId() {
  id++
  db.set(MAX_ID, id.toString())
  return id.toString()
}

export default createId