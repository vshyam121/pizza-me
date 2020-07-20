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
    const newState = authReducer(
      { ...initialState, signInError: {}, signUpError: {} },
      testPayload
    );

    const expectedState = {
      idToken: null,
      userId: null,
      signInError: null,
      signUpError: null,
      loading: true,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type AUTH_SUCCESS', () => {
    const testPayload = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'test id token',
      userId: 'test user id',
    };
    const newState = authReducer(initialState, testPayload);
    const expectedState = {
      idToken: testPayload.idToken,
      userId: testPayload.userId,
      signInError: null,
      signUpError: null,
      loading: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SIGN_IN_FAILED', () => {
    const testPayload = {
      type: actionTypes.SIGN_IN_FAILED,
      error: { test },
    };
    const newState = authReducer(initialState, testPayload);

    const expectedState = {
      idToken: null,
      userId: null,
      signInError: testPayload.error,
      signUpError: null,
      loading: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type SIGN_UP_FAILED', () => {
    const testPayload = {
      type: actionTypes.SIGN_UP_FAILED,
      error: { test },
    };
    const newState = authReducer(initialState, testPayload);

    const expectedState = {
      idToken: null,
      userId: null,
      signInError: null,
      signUpError: testPayload.error,
      loading: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it('Should return correct new state if receiving type AUTH_SIGNOUT', () => {
    const newState = authReducer(
      { ...initialState, idToken: 'test id token', userId: 'test user id' },
      {
        type: actionTypes.AUTH_SIGNOUT,
      }
    );

    expect(newState).toStrictEqual(initialState);
  });
});
