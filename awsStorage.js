import amplify from 'aws-amplify';

export default class AWSStorage {
  constructor(conf) {
    amplify.configure({
      Auth: conf.auth,
      Storage: {
        ...conf.storage,
        level: 'private'
      }
    });
  }
  
  async authorize(username, password) {
    await amplify.Auth.signIn(username, password)
  }
  
  async getAllFiles() {
    const objs = await amplify.Storage.list('', {level: 'private'});
    return objs.map((file) => {
      return file.key;
    }).filter((path) => {
      return path !== '';
    });
  }

  async getSharableLinkForFile(file) {
    return await amplify.Storage.get(file);
  }
}