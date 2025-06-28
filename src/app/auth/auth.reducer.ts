import { Action, createReducer, on, props } from '@ngrx/store';
import { removeUser, setUser } from './auth.actions';
import { User } from '../models/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,

  on(setUser, (state, props) => ({ ...state, user: { ...props.user } })),
  on(removeUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: State | undefined, action: Action<string>) {
  return _authReducer(state, action);
}
