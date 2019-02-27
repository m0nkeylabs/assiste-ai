import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import * as fromActions from 'app/login/store/actions';

export interface State extends EntityState<any> {
    loading: boolean;
    loaded: boolean;
    login: any;
    loadingToken: boolean;
    loadedToken: boolean;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: (login: any) => login.acess_token
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    loaded: false,
    login: null,
    loadingToken: false,
    loadedToken: false
});

export function reducer(state = initialState, action: fromActions.LoginPage): State {
    switch (action.type) {
      case fromActions.LOGIN:
      case fromActions.LOGOUT: {
          return {
              ...state,
              loading: true
          };
      }

      case fromActions.LOGIN_SUCCESS: {
          return {
              ...state,
              loading: false,
              loaded: true,
              login: action.response
          };
        }

      case fromActions.LOGOUT_SUCCESS: {
        return {
            ...state,
            loading: false,
            loaded: true,
            login: null
        };
      }

      case fromActions.VERIFY_TOKEN: {
        return {
            ...state,
            loadingToken: true
        };
      }

      case fromActions.VERIFY_TOKEN_FAIL:
      case fromActions.VERIFY_TOKEN_SUCCESS: {
        return {
            ...state,
            loadingToken: false,
            loadedToken: true,
        };
      }

      case fromActions.LOGIN_FAIL:
      case fromActions.LOGOUT_FAIL: {
        return {
            ...state,
            loading: false,
            login: null,
        };
      }
      default: {
          return state;
      }
    }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getLoginData = (state: State) => state.login;
export const getTokenLoading = (state: State) => state.loadingToken;
export const getTokenLoaded = (state: State) => state.loadedToken;
