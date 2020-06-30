// Angular Modules
import {Injectable} from '@angular/core';
// Application Classes
import {UrlBuilder} from '../classes/url-builder';
import {QueryStringParameters} from '../classes/query-string-parameters';
// Application Constants
import {Constants} from '../../config/constants';
@Injectable()
export class ApiEndpointsService {
  constructor(// Application Constants
    private constants: Constants) {
  }

  /* #region URL CREATOR */
  // URL
  private createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(action: string,
                                       queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(action: string,
                                     pathVariables: any[] = []): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }

  /* #endregion */

  public getNumbersEndpoint(raffle: string): string {
    return this.createUrlWithQueryParameters('numbers/get-used-numbers', (qs: QueryStringParameters) => {
        qs.push('raffleName', raffle);

      }
    );
  }

  public getLoginEndpoint(): string {
    return this.createUrl('users/login');
  };

  public getAddToPayParticipantEndpoint(): string {
    return this.createUrl('participants/add-to-pay-participant');
  };

  public getAddToPayParticipantToRaffleEndpoint(): string {
    return this.createUrl('to-pays/add-to-pay-participant-to-raffle');
  };

  public getToPayParticipantsEndpoint(raffle: string): string {
    return this.createUrlWithQueryParameters('to-pays/get-to-pays', (qs: QueryStringParameters) => {
      qs.push('raffle', raffle)
    });
  };

  public getParticipantsEndpoint(raffle: string): string {
    return this.createUrlWithQueryParameters('participants/get-participants', (qs: QueryStringParameters) => {
      qs.push('raffle', raffle)
    });
  }

  public getDeleteParticipant(): string {
    return this.createUrl('participants/delete-participant');
  }

  public getDeleteToPay(): string {
    return this.createUrl('to-pays/delete-to-pay');
  }


}
