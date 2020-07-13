import moxios from 'moxios';
import { testStore } from '../../../shared/util';
import { signIn } from '../authActions/authActions';
import configureMockStore from 'redux-mock-store';
import { middleware } from '../../store';

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
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse,
      });
    });

    const expectedState = {
      idToken: 'test id token',
      userId: 'test user id',
      signInError: null,
      signUpError: null,
      loading: false,
    };

    return store.dispatch(signIn('test email', 'test password')).then(() => {
      const newState = store.getState().auth;
      expect(newState).toEqual(expectedState);
    });
  });
});
