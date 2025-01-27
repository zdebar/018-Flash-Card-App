export function importToIndexedDB(fileName, version = 1) {
    const dbName = fileName;
    const storeName = 'Vocabulary';

    const request = indexedDB.open(dbName, version);
  
    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'lesson' });
        }
    };
  
    request.onsuccess = async function(event) {
      const db = event.target.result;
  
        try {
            const response = await fetch(`../public/data/${fileName}.json`);
            const data = await response.json();
    
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
    
            for (const lessonKey in data) {
            if (Object.prototype.hasOwnProperty.call(data, lessonKey)) {
                const lessonData = { lesson: lessonKey, ...data[lessonKey] };
                store.put(lessonData); 
            }
            }
    
            transaction.oncomplete = function() {
            console.log('Data has been successfully imported to IndexedDB');
            };
    
            transaction.onerror = function() {
            console.error('Error importing data to IndexedDB');
            };
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    };
  
    request.onerror = function() {
      console.error('Error opening IndexedDB');
    };
}