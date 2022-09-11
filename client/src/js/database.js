import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Create Db connection and select version
  const jateDb = await openDB('jate_db', 1);

  // Select Db and data privlages and create new transaction
  const tx = jateDb.transaction('jate_db', 'readwrite');

  // Open desired object store
  const store = tx.objectStore('jate');

  // Use .add() method to pass in content to store
  const request = store.put({ content: content});

  // Recieve confirmation
  const result = await request;
  console.log('🎉 Data Saved To The Database 🎉', result);

  //

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database')

  // Generate db connection and select version
  const jateDb = await openDB('jate_db', 1);

  // Select Db and data privlages and create new transaction
  const tx = jateDb.transaction('jate', 'readonly');

  // Open desired object store
  const store = tx.objectStore('jate');

  // Use .getAll() to GET all data in Db
  const request = store.getAll();

   // Recieve confirmation
   const result = await request;
   console.log('result.value', result);
   return result;

}

initdb();
