import moxios from 'moxios';
import * as actions from './authActions';
import * as actionTypes from '../authActionTypes';
import * as cartActionTypes from '../../cart/cartActionTypes';
import * as checkoutActionTypes from '../../checkout/checkoutActionTypes';
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

  test('Auth success action dispatched', () => {
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

  test('Auth success action dispatched', () => {
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

  test('Auth success action dispatched', () => {
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
      expect(newActions).toEqual(expect.arrayContaining(expectedActions));
    });
  });
});

describe('Sign out action', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Sign out action dispatched for cart and auth', () => {
    const store = mockStore({});

    moxios.stubRequest('/auth/signout', {
      status: 200,
    });

    const expectedActions = [
      { type: cartActionTypes.SIGN_OUT_CART },
      {
        type: actionTypes.AUTH_SIGNOUT,
      },
    ];

    return store.dispatch(actions.signOut()).then(() => {
      const newActions = store.getActions();
      expect(newActions).toEqual(expectedActions);
    });
  });
});

describe('Auth success action', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Auth success action dispatched', () => {
    const store = mockStore({});

    const authData = {
      user: {
        _id: 'test user id',
        cart: { _id: 'test cart id', items: ['test item'], quantity: 1 },
      },
    };
    const expectedActions = [
      {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.user._id,
      },
      {
        type: cartActionTypes.SET_CART_ITEMS,
        cartId: authData.user.cart._id,
        items: authData.user.cart.items,
        quantity: authData.user.cart.quantity,
      },
      {
        type: checkoutActionTypes.GET_ORDERS_START,
      },
    ];

    store.dispatch(actions.authSuccess(authData));
    const newActions = store.getActions();
    expect(newActions).toEqual(expectedActions);
  });
});

describe('Auth start action', () => {
  test('Auth start action dispatched', () => {
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
  test('Auth reset action dispatched', () => {
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
  test('Sign in failed action dispatched', () => {
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

describe('Sign up failed action', () => {
  test('Sign up failed action dispatched', () => {
    const store = mockStore({});

    const error = 'error';

    const expectedActions = [
      {
        type: actionTypes.SIGN_UP_FAILED,
        error: error,
      },
    ];

    store.dispatch(actions.signUpFailed(error));
    const newActions = store.getActions();
    expect(newActions).toEqual(expectedActions);
  });
});
