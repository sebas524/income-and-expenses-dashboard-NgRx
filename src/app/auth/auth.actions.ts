import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setUser = createAction(
  '[Auth Component] setUser',
  props<{ user: User }>()
);
export const removeUser = createAction('[Auth Component] removeUser');
