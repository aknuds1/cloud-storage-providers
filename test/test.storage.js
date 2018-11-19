import '@babel/polyfill';
import {expect} from 'chai';
import sinon from 'sinon';

import AWSStorage from '../awsStorage';

describe('AWSStorage', () => {
  let storage, fakeAmplify;
  
  beforeEach(() => {
    fakeAmplify = {
      configure: sinon.fake(),
      Auth: {
        signIn: sinon.fake()
      },
      Storage: {
        list: sinon.fake(),
        get: sinon.fake()
      }
    };
    AWSStorage.__Rewire__('amplify', fakeAmplify);
    
    storage = new AWSStorage({
      auth: {
        identityPoolId: 'test',
        region: 'test',
        userPoolId: 'test',
        userPoolWebClientId: 'test'
      },
      storage: {
        bucket: 'test',
        region: 'test'
      }
    });
  });
  
  afterEach(() => {
    AWSStorage.__ResetDependency__('amplify');
  });
  
  describe('constructor', () => {
    it('should configure Amplify correctly', async () => {
      expect(fakeAmplify.configure.args[0]).to.deep.equal([{
        Auth: {
          identityPoolId: 'test',
          region: 'test',
          userPoolId: 'test',
          userPoolWebClientId: 'test'
        },
        Storage: {
          bucket: 'test',
          region: 'test',
          level: 'private'
        }
      }]);
    });
  });
  
  describe('authorize', () => {
    it('should authenticate against AWS Cognito', async () => {
      await storage.authorize('user', 'pass');
      
      expect(fakeAmplify.Auth.signIn.args[0]).to.deep.equal(['user', 'pass']);
    });
  });
  
  describe('getAllFiles', () => {
    it(`should get all of the user's files`, async () => {
      fakeAmplify.Storage.list = sinon.fake.returns([{key: 'test.txt'}]);
      
      const gotFiles = await storage.getAllFiles();
      
      expect(gotFiles).to.deep.equal(['test.txt']);
    });
  });
  
  describe('getSharableLinkForFile', () => {
    it(`should get a shareable URL for a file`, async () => {
      const expUrl = 'http://test.com/test.txt';
      fakeAmplify.Storage.get = sinon.fake.returns(expUrl);
      
      const gotUrl = await storage.getSharableLinkForFile('test.txt');
      
      expect(gotUrl).to.equal(expUrl);
    });
  });
});