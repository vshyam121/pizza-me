import moxios from 'moxios';
import { signIn } from './authActions';
import * as actionTypes from './authActionTypes';
import configureMockStore from 'redux-mock-store';
import { middleware } from '../store';

const mockStore = configureMockStore(middleware);

describe('Sign in action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const mockResponse = {
      idToken: 'test id token',
      localId: 'test user id',
      expiresIn: 1000,
      loading: false,
    };
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse,
      });
    });

    const expectedActions = [
      { type: actionTypes.AUTH_START },
      {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'test id token',
        userId: 'test user id',
      },
    ];

    return store.dispatch(signIn('test email', 'test password')).then(() => {
      const newActions = store.getActions();
      expect(newActions).toEqual(expect.arrayContaining(expectedActions));
    });
  });
});
