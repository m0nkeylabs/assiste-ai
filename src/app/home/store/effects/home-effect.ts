import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { HomeService } from '@services/home.service';

import * as fromActions from 'app/home/store/actions';


@Injectable()
export class HomeEffects {

  @Effect()
  loadHomeList$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LOAD_HOME_LIST),
    switchMap((params: fromActions.LoadHomeList) =>
      this.service.getAllMoviesAndSeries(params.filter).pipe(
        map((response: Array<any>) => new fromActions.LoadHomeListSuccess(response)),
        catchError(error => of(new fromActions.LoadHomeListFail(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loadHomeListFail$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.LOAD_HOME_LIST_FAIL),
    tap((action: fromActions.LoadHomeListFail) => {
          this.toastr.error(`action.payload.error.message`);
    })
  );

  constructor(
    private actions$: Actions,
    private service: HomeService,
    private toastr: ToastrService) { }
}
