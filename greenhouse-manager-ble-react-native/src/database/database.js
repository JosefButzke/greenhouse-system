import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class Database {
  initDB() {
    return SQLite.openDatabase({
      name: 'database',
      createFromLocation: '~/www/Database.db',
    });
  }

  index() {
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM variaveis', [], function(tx, results) {
            resolve(results);
          });
        }).then(results => this.closeDatabase(db));
      });
    });
  }

  store(temperatura, umidade_solo, umidade_ar, altura, date) {
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO variaveis(temperatura, umidade_solo, umidade_ar, altura, date) VALUES(?,?,?,?,?)',
            [temperatura, umidade_solo, umidade_ar, altura, date],
            function(tx, results) {
              resolve(results);
            },
          );
        }).then(results => this.closeDatabase(db));
      });
    });
  }

  deleteDataOfTable() {
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql('DELETE FROM variaveis;', [], function(tx, results) {
            resolve(results);
          });
        }).then(results => this.closeDatabase(db));
      });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.tron.log('Closing DB');
      db.close()
        .then(status => {
          console.tron.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.tron.log('Database was not OPENED');
    }
  }
}
