import db from 'sqlite';
import path from 'path';
import paths from '../../paths';

export async function init() {
    const force = process.env.NODE_ENV === 'development' ? 'last' : false;
    const migrationsPath = path.join(paths.root, 'migrations');

    console.log('Accessing database...');
    await db.open(paths.database, { cached: true });
    console.log('Migrating database...');
    await db.migrate({
        migrationsPath,
        force
    });
    console.log('Migrating database completed.');

    if (process.env.NODE_ENV === 'development') {
        await seedDemoData();
    }
}

async function seedDemoData() {
    console.log('Seeding demo database data...');
    await db.run(`INSERT INTO Users (id, login, password) VALUES(NULL, 'kacpak', 'pass')`);
    await db.run(`INSERT INTO Users (id, login, password) VALUES(NULL, 'test', 'pass')`);
    console.log('Seeding demo database data completed.');
}
