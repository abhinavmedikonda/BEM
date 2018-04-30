import { SendDataService } from './Services/send-data.service';

export class AuthorizationService {
  static IsAuthenticated: boolean = true;
  static IsBuildPM: boolean = true;
  static IsLeadPM: boolean = false;
  static IsTester: boolean = false;
  static IsTestLeadPM: boolean = true;
  static UserRole: String;
  static UserId: number = 1;
  static UserName: String;

  static getUserDetails(sendDataService: SendDataService) {
    sendDataService.read('/Users/GetUserRoleDetails/' + this.UserId).subscribe((response) => {
      if (response.length > 0) {
        this.UserRole = response[0].RoleName;
      }
    });
  }
}
