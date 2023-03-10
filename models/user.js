const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILE_NAME
});

module.exports.getInfo = async () => {
    const result = await db.collection('users').get();
    let lists = [];
    result.forEach((doc) => {
        lists.push(doc.data());
    });
    console.log(lists);
    return lists;
};