import authReducer from './authReducer';
import { initialState } from './authReducer';
import * as actionTypes from '../authActionTypes';
import hash from 'object-hash';

describe('Auth Reducer', () => {
  it('Should return default state', () => {
    const newState = authReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return correct new state if receiving type AUTH_START', () => {
    const testPayload = {
      type: actionTypes.AUTH_START,
    };

    const inputInitialState = {
      ...initialState,
      signInError: 'test sign in error',
      signUpError: 'test sign up error',
    };

    const newState = authReducer(inputInitialState, testPayload);

    const expectedState = {
      ...initialState,
      loadingUser: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type AUTH_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.AUTH_SUCCESS,
      userId: 'test user id',
    };
    const newState = authReducer(initialState, testPayload);
    const expectedState = {
      ...initialState,
      userId: testPayload.userId,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SIGN_IN_FAILED', () => {
    const testPayload = {
      type: actionTypes.SIGN_IN_FAILED,
      error: 'test error',
    };
    const newState = authReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      signInError: testPayload.error,
      loadingUser: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SIGN_UP_FAILED', () => {
    const testPayload = {
      type: actionTypes.SIGN_UP_FAILED,
      error: 'test error',
    };
    const newState = authReducer(initialState, testPayload);

    const expectedState = {
      ...initialState,
      signUpError: testPayload.error,
      loadingUser: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type AUTH_SIGNOUT', () => {
    const inputInitialState = {
      ...initialState,
      userId: 'test user id',
    };
    const newState = authReducer(inputInitialState, {
      type: actionTypes.AUTH_SIGNOUT,
    });

    const expectedState = {
      ...initialState,
      userId: null,
    };

    expect(newState).toStrictEqual(initialState);
  });
});
