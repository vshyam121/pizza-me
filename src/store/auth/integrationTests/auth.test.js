import moxios from 'moxios';
import { testStore } from '../../../shared/util';
import { signIn } from '../authActions/authActions';
import configureMockStore from 'redux-mock-store';
import { middleware } from '../../store';
import axios from '../../../shared/axiosAPI';

const mockStore = configureMockStore(middleware);

describe('Sign in action', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const mockResponse = {
      user: { _id: 'test user id', cart: { _id: 'test cart id' } },
      expires: new Date().getTime(),
    };
    const store = testStore();

    moxios.stubRequest('/auth/signin', {
      status: 200,
      response: mockResponse,
    });

    const expectedState = {
      userId: 'test user id',
      signInError: null,
      signUpError: null,
      loadingUser: false,
    };

    return store.dispatch(signIn('test email', 'test password')).then(() => {
      const newState = store.getState().auth;
      expect(newState).toEqual(expectedState);
    });
  });
});
