import moxios from 'moxios';
import * as actions from './authActions';
import * as actionTypes from '../authActionTypes';
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
    const store = mockStore({});

    moxios.stubRequest('/auth/signin', {
      status: 200,
      response: mockResponse,
    });

    const expectedActions = [
      { type: actionTypes.AUTH_START },
      {
        type: actionTypes.AUTH_SUCCESS,
        userId: 'test user id',
      },
    ];

    return store
      .dispatch(actions.signIn('test email', 'test password'))
      .then(() => {
        const newActions = store.getActions();
        console.log(newActions);
        expect(newActions).toEqual(expect.arrayContaining(expectedActions));
      });
  });
});

describe('Sign up action', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const mockResponse = {
      user: {
        _id: 'test user id',
        cart: { _id: 'test cart id' },
      },
      expires: new Date().getTime(),
    };
    const store = mockStore({});

    moxios.stubRequest('/auth/signup', {
      status: 200,
      response: mockResponse,
    });

    const expectedActions = [
      { type: actionTypes.AUTH_START },
      {
        type: actionTypes.AUTH_SUCCESS,
        userId: 'test user id',
      },
    ];

    return store
      .dispatch(actions.signUp('test email', 'test password'))
      .then(() => {
        const newActions = store.getActions();
        console.log(newActions);
        expect(newActions).toEqual(expect.arrayContaining(expectedActions));
      });
  });
});

describe('Init app action', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const mockResponse = {
      user: {
        _id: 'test user id',
        cart: { _id: 'test cart id' },
      },
      expires: new Date().getTime(),
    };
    const store = mockStore({});

    moxios.stubRequest('/auth/me', {
      status: 200,
      response: mockResponse,
    });

    const expectedActions = [
      {
        type: actionTypes.AUTH_SUCCESS,
        userId: 'test user id',
      },
    ];

    return store.dispatch(actions.initApp()).then(() => {
      const newActions = store.getActions();
      console.log(newActions);
      expect(newActions).toEqual(expect.arrayContaining(expectedActions));
    });
  });
});

describe('Auth start action', () => {
  test('Store is updated correctly', () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: actionTypes.AUTH_START,
      },
    ];

    store.dispatch(actions.authStart());
    const newActions = store.getActions();
    expect(newActions).toEqual(expectedActions);
  });
});

describe('Auth reset action', () => {
  test('Store is updated correctly', () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: actionTypes.AUTH_RESET,
      },
    ];

    store.dispatch(actions.authReset());
    const newActions = store.getActions();
    expect(newActions).toEqual(expectedActions);
  });
});

describe('Sign in failed action', () => {
  test('Store is updated correctly', () => {
    const store = mockStore({});

    const error = 'error';

    const expectedActions = [
      {
        type: actionTypes.SIGN_IN_FAILED,
        error: error,
      },
    ];

    store.dispatch(actions.signInFailed(error));
    const newActions = store.getActions();
    expect(newActions).toEqual(expectedActions);
  });
});
